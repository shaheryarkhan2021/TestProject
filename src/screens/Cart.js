import React from 'react'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import * as cartActions from 'actions/cart'
import * as productActions from 'actions/product'
import { upper } from 'helper'

export default _ => {
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const product = useSelector(state => state.product)
  const currency = useSelector(state => state.currency)

  const handleRemoveFromCart = record => {
    dispatch(cartActions.removeFromCart(record))

    dispatch(productActions.changeProductQuantity({ ...record, quantity: -record.quantity }))
  }

  const handelQuantityChange = (record, quantity, type) => {
    let size = product.sizes.find(size => size.id === record.sizeId)
    let productQuantityInCart = cart.filter((c) => c.sizeId === size.id && c.colorId === record.colorId).map((q) => q.quantity).reduce((a, b) => a+b)

    if (productColor(record).quantity > 0) {
      if ((productQuantityInCart + productColor(record).quantity) >= quantity) {
        dispatch(cartActions.handleQuantityCart({
          record: record,
          quantity: quantity
        }))

        dispatch(productActions.changeProductQuantity({ ...record, quantity: quantity - record.quantity }))
      }
    } else if (type === 'desc' && productColor(record).quantity === 0) {
      dispatch(cartActions.handleQuantityCart({
        record: record,
        quantity: quantity
      }))

      dispatch(productActions.changeProductQuantity({ ...record, quantity: quantity - record.quantity }))
    }
  }

  const productImage = product.images.length !== 0 && product.images[0].url
  const totalAmount = () => cart.length !== 0 ? cart.map(item => item.quantity * (product.price / 100)).reduce((a, b) => a + b) : 0;
  const productColor = item => product.sizes.find(size => size.id === item.sizeId).colors.find(c => c.name === item.colorId)

  return (
    <div>
      <div className='cart-main-div'>
        {
          cart.length === 0 &&
            <div className='shopping_bag'>
              <h1 className='font-size--up-5 medium--font-size--up-7'>Your Shopping Bag</h1>
              <p className='text-secondary-dark font-size--down-1'>Your cart is empty.</p>
              <Link to='/' className='inline-block continue_shopping button-primary'>Continue shopping</Link>
            </div>
        }

        {
          cart.length !== 0 &&
            <>
              <div className='grid-container'>
                <div className='cart-header'>
                  <h2>
                    Your Shopping Bag
                  </h2>
                  <p>
                    We offer FREE shipping and 60-day returns
                  </p>
                </div>

                <div className='grid-x grid-padding-x'>
                  <div className='cell medium-12 large-8 small-12'>
                    <div className='grid-item xlarge--two-thirds'>
                      {
                        cart.map((item, index) => (
                          <div className='cart-item-container' key={index}>
                            <div>
                              <div className='grid-x grid-padding-x'>
                                <div className='cell medium-3 large-2 small-2'>
                                  <div className='image-holder'>
                                    <img src={productImage} className='cart-item-image' alt='Cart Item' />
                                  </div>
                                </div>

                                <div className='cell medium-9 large-8 small-8'>
                                  <div>
                                    <div className='flex_item_head'>
                                      <h3>
                                        { product.name }
                                      </h3>
                                       <div className='item_price'>
                                          {currency['symbol']}{product.price / 100} {currency['title']}
                                        </div>
                                    </div>

                                    <div className='cart-item-quantity'>
                                      <span className='cursor-pointer' onClick={() => { handelQuantityChange(item, item.quantity - 1, 'desc') }}>
                                        <span>-</span>
                                      </span>

                                       <div className='cart-item-quantity-input'>
                                        <input type='text' name='updates' value={item.quantity} min='0' max={`${productColor(item).quantity}`} readOnly step='1' />
                                      </div>

                                      <span className='cursor-pointer' onClick={() => { handelQuantityChange(item, item.quantity + 1, 'inc') }}>
                                        <span>+</span>
                                      </span>
                                    </div>

                                    <div className='block_row'>
                                      <div className='color_block'>
                                        Color: {upper(productColor(item).name)}
                                      </div>
                                      <div>
                                        Size: {product.sizes.find(size => size.id === item.sizeId).abbreviation}
                                      </div>
                                    </div>

                                    <div className='stock_text'>
                                      <p>
                                        In Stock
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className='cart-item-remove' onClick={() => handleRemoveFromCart(item)}>
                              <FontAwesomeIcon icon={faTimes} />
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>

                  <div className='cell medium-12 large-4 small-12'>
                    <div className='cart_subtotal'>
                      <div className='cart_subtotal_inner'>
                        <div className='subtotal'>
                          <div>
                            <span>
                              Subtotal
                            </span>
                          </div>

                          <div>
                            <span>
                              {currency['symbol']}{totalAmount()} {currency['title']}
                            </span>
                          </div>
                        </div>

                        <button className='cursor-pointer' type='submit' name='checkout' value='Checkout'>
                          Checkout
                        </button>

                        <div className='cart-checkout-payment-icons'>
                          <div>
                            <div className='flex-item'>
                              <svg viewBox='0 0 38 24' xmlns='http://www.w3.org/2000/svg'><path d='M34 15.96c0 .709-.459 1.039-1.281 1.039h-1.571v-.71h1.57c.146 0 .266-.022.315-.07a.297.297 0 0 0 .097-.213.353.353 0 0 0-.097-.235c-.049-.048-.145-.071-.29-.071-.75-.024-1.692.023-1.692-1.016 0-.473.315-.992 1.16-.992h1.62v.708h-1.5c-.144 0-.241 0-.313.048-.072.07-.12.141-.12.26 0 .118.072.189.167.236.097.024.194.047.315.047h.435c.459 0 .75.095.942.26.146.166.243.379.243.709zm-3.408-.708c-.193-.166-.483-.26-.943-.26h-.435c-.12 0-.217-.024-.313-.048-.097-.047-.17-.118-.17-.236 0-.119.025-.19.122-.26.072-.048.168-.048.313-.048h1.498v-.708h-1.619c-.87 0-1.16.52-1.16.992 0 1.04.943.992 1.691 1.016.146 0 .243.023.291.07.048.048.097.141.097.236a.3.3 0 0 1-.097.213c-.073.048-.17.07-.314.07h-1.57V17h1.57c.821 0 1.28-.33 1.28-1.039 0-.33-.096-.543-.24-.708zm-3.094 1.062H25.59v-.661h1.86v-.662h-1.86v-.615h1.908v-.685h-2.705v3.307h2.705v-.684zm-3.576-2.456c-.265-.142-.58-.166-.991-.166h-1.86V17h.821v-1.204h.871c.29 0 .459.024.58.142.144.165.144.449.144.661V17h.797v-.638c0-.307-.023-.45-.12-.614a.95.95 0 0 0-.41-.284.912.912 0 0 0 .58-.874c0-.378-.146-.59-.412-.732zm-4.59-.166h-2.587l-1.039 1.087-.99-1.087h-3.263V17h3.214l1.039-1.087.99 1.087h1.572v-1.11h1.015c.7 0 1.401-.188 1.401-1.11 0-.897-.725-1.087-1.353-1.087zm3.938 1.37c-.12.048-.242.048-.387.048l-.99.023v-.756h.99c.145 0 .29 0 .387.071a.3.3 0 0 1 .169.283c0 .142-.073.26-.17.331zm-3.939.166h-1.063v-.85h1.063c.29 0 .483.118.483.402 0 .282-.193.448-.483.448zm-3.117.118l1.256-1.3v2.67l-1.256-1.37zm-1.958.968H12.25v-.661h1.788v-.662H12.25v-.615h2.03l.895.968-.92.97zm17.496-5.007h-1.16l-1.523-2.48v2.48h-1.643l-.314-.733H25.42l-.313.733h-.943c-.386 0-.894-.095-1.184-.38-.265-.282-.41-.66-.41-1.25 0-.497.072-.945.434-1.3.242-.26.677-.377 1.232-.377h.774v.708h-.774c-.29 0-.458.048-.627.19-.145.141-.218.401-.218.755 0 .355.073.615.218.78.12.118.338.165.555.165h.362l1.16-2.597h1.209l1.353 3.117V8.001h1.257l1.426 2.29v-2.29h.822v3.306h-.001zM22.158 8h-.822v3.307h.822V8zm-1.716.142C20.177 8 19.887 8 19.476 8h-1.86v3.307h.797v-1.205h.87c.29 0 .483.023.604.142.145.165.12.449.12.638v.425h.822v-.662c0-.283-.024-.425-.144-.59a1.006 1.006 0 0 0-.387-.284.938.938 0 0 0 .58-.873c0-.379-.17-.591-.436-.756zm-3.407 2.48H15.15V9.96h1.861v-.685h-1.86v-.59h1.884V8h-2.707v3.307h2.707v-.685zM13.725 8h-1.33l-.99 2.244L10.34 8H9.036v3.118L7.658 8H6.45L5 11.307h.87l.315-.733h1.69l.315.733h1.643V8.708l1.184 2.599h.701l1.184-2.599v2.599h.822V8zm13.097 1.866l-.555-1.3-.556 1.3h1.111zm-7.008-.52c-.12.07-.241.07-.41.07h-.992v-.731h.992c.144 0 .313 0 .41.047.096.071.145.166.145.307 0 .142-.049.26-.145.307zm-13.34.52l.556-1.3.555 1.3h-1.11z' fill='#404041' fillRule='evenodd'></path></svg>
                            </div>

                            <div className='flex-item'>
                              <svg viewBox='0 0 36 22' xmlns='http://www.w3.org/2000/svg'><g transform='translate(-1 -1)' fillRule='nonzero' fill='none'><path d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" fill="#FFF"></path><circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle><path d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7 0 2.3 1.2 4.5 3 5.7 1.8-1.2 3-3.3 3-5.7z" fill="#FF5F00"></path></g></svg>
                            </div>

                            <div className='flex-item'>
                              <svg viewBox='0 0 36 22' xmlns='http://www.w3.org/2000/svg'><g fillRule='nonzero' fill='none'><path d='M34 0c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h32' fill="#FFF"></path><path d="M27.3 9.1H27c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L26 7.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H17c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2l-1.7.1zM4 7.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H8.7c-.1 0-.2 0-.2-.2L6.9 8.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L4 7.2z" fill="#142688"></path></g></svg>
                            </div>

                            <div className='flex-item'>
                              <svg viewBox='0 0 38 24' xmlns='http://www.w3.org/2000/svg'><g fillRule='nonzero' fill='none'><path d='M24.163 8h-2.03c-.118 0-.238.147-.298.295L21 14.779c0 .147.06.221.179.221h1.074c.12 0 .18-.074.18-.221l.238-1.842c0-.148.12-.295.298-.295h.657c1.372 0 2.148-.81 2.327-2.431.12-.664 0-1.253-.239-1.622C25.356 8.221 24.82 8 24.163 8m.239 2.432c-.12.884-.657.884-1.194.884h-.358l.239-1.695c0-.074.06-.147.179-.147h.12c.357 0 .715 0 .894.294.12.074.12.295.12.664' fill="#139AD6"></path><path d="M8.163 8h-2.03c-.118 0-.238.147-.298.295L5 14.779c0 .147.06.221.179.221h.955c.12 0 .239-.147.298-.295l.239-1.768c0-.148.12-.295.298-.295h.657c1.372 0 2.148-.81 2.327-2.431.12-.664 0-1.253-.239-1.622C9.356 8.221 8.88 8 8.163 8m.239 2.432c-.12.884-.657.884-1.194.884H6.91l.238-1.695c0-.074.06-.147.18-.147h.119c.358 0 .716 0 .895.294.06.074.12.295.06.664M14.755 10.152h-.98c-.061 0-.184.075-.184.151l-.061.379-.061-.152c-.245-.378-.674-.53-1.164-.53-1.103 0-2.083 1.06-2.267 2.5-.122.758.062 1.44.368 1.894.306.454.735.606 1.286.606.92 0 1.41-.682 1.41-.682l-.062.379c0 .151.061.227.184.227h.918c.123 0 .245-.151.307-.303L15 10.38c-.061-.076-.184-.227-.245-.227m-1.409 2.424c-.122.682-.551 1.212-1.164 1.212a.883.883 0 0 1-.674-.303c-.122-.227-.183-.53-.183-.91.061-.681.551-1.211 1.102-1.211.307 0 .49.151.674.303.184.227.245.606.245.909" fill="#263B80"></path><path d="M30.755 10.152h-.98c-.061 0-.184.075-.184.151l-.061.379-.061-.152c-.245-.378-.674-.53-1.164-.53-1.103 0-2.083 1.06-2.267 2.5-.122.758.062 1.44.368 1.894.306.454.735.606 1.286.606.92 0 1.41-.682 1.41-.682l-.062.379c0 .151.061.227.184.227h.918c.123 0 .245-.151.307-.303L31 10.38c-.061-.076-.123-.227-.245-.227m-1.409 2.424c-.122.682-.551 1.212-1.164 1.212a.883.883 0 0 1-.674-.303c-.122-.227-.183-.53-.183-.91.061-.681.551-1.211 1.102-1.211.307 0 .49.151.674.303.245.227.306.606.245.909" fill="#139AD6"></path><path d="M20.95 10.354h-1.093c-.128 0-.193.07-.257.138l-1.414 2.354-.643-2.215c-.064-.139-.129-.208-.322-.208h-1.028c-.129 0-.193.139-.193.277l1.157 3.67-1.093 1.66c-.064.14 0 .347.129.347h1.028c.129 0 .193-.07.258-.139l3.535-5.469c.193-.207.065-.415-.064-.415" fill="#263B80"></path><path d="M32.264 8.346l-.9 6.23c0 .14.065.209.193.209h.9c.129 0 .257-.139.322-.277l.9-6.093c0-.138-.065-.207-.193-.207h-1.029c-.064-.07-.128 0-.193.138" fill="#139AD6"></path></g></svg>
                            </div>

                            <div className='flex-item'>
                              <svg viewBox='0 0 38 24' xmlns='http://www.w3.org/2000/svg'><g fillRule='nonzero' fill='none'><path d='M34.597.81l.384.002c.104 0 .208.001.312.004.182.005.395.015.593.05.172.032.317.079.456.15.277.14.502.366.643.644.07.138.117.281.148.455.036.196.046.41.05.592.003.104.005.207.005.313l.001.383V21.31l-.005.31a4.048 4.048 0 0 1-.051.595c-.026.157-.076.31-.148.453a1.469 1.469 0 0 1-.645.645 1.59 1.59 0 0 1-.452.148 4.135 4.135 0 0 1-.591.05c-.105.002-.21.004-.317.004l-.383.001H3.017c-.103-.001-.207-.002-.31-.005a4.133 4.133 0 0 1-.593-.05 1.593 1.593 0 0 1-.456-.15 1.455 1.455 0 0 1-.643-.643 1.592 1.592 0 0 1-.148-.456 3.965 3.965 0 0 1-.05-.591 15.172 15.172 0 0 1-.005-.312l-.001-.304V3.019c0-.104.002-.208.005-.312.005-.182.015-.394.05-.594a1.59 1.59 0 0 1 .15-.455 1.46 1.46 0 0 1 .643-.643c.143-.072.296-.122.454-.148.2-.036.412-.046.594-.05.104-.004.208-.005.311-.005L3.403.81h31.194' fill="#FFF"></path><g fill="#000"><path d="M9.988 8.212c.323-.403.541-.944.484-1.497-.472.024-1.047.311-1.38.715-.3.345-.564.909-.495 1.438.529.046 1.058-.264 1.391-.656M10.466 8.972c-.77-.046-1.423.436-1.79.436s-.93-.413-1.537-.402a2.267 2.267 0 0 0-1.928 1.17c-.826 1.424-.218 3.536.586 4.696.39.574.86 1.205 1.48 1.182.585-.023.814-.379 1.525-.379s.918.38 1.538.368c.642-.012 1.044-.574 1.434-1.148.447-.654.63-1.286.642-1.32-.012-.012-1.239-.483-1.25-1.895-.012-1.182.963-1.744 1.01-1.779-.552-.815-1.412-.906-1.71-.93"></path><g><path d="M18.13 7.372c1.671 0 2.835 1.152 2.835 2.828 0 1.683-1.188 2.841-2.876 2.841h-1.85v2.942h-1.337V7.372h3.228zm-1.891 4.547h1.533c1.164 0 1.826-.627 1.826-1.713S18.936 8.5 17.778 8.5h-1.54v3.419zM21.297 14.199c0-1.104.841-1.737 2.392-1.832l1.665-.102v-.477c0-.698-.459-1.08-1.277-1.08-.674 0-1.163.346-1.265.877h-1.205c.036-1.116 1.086-1.928 2.506-1.928 1.528 0 2.524.8 2.524 2.041v4.285h-1.235v-1.032h-.03c-.352.674-1.128 1.097-1.969 1.097-1.241 0-2.106-.74-2.106-1.85zm4.057-.555v-.484l-1.485.096c-.836.054-1.271.364-1.271.907 0 .525.453.865 1.163.865.907 0 1.593-.579 1.593-1.384zM27.773 18.286v-1.032c.084.012.286.024.394.024.59 0 .925-.25 1.128-.895l.12-.382-2.263-6.266h1.397l1.575 5.084h.03l1.576-5.084h1.36l-2.345 6.582c-.537 1.51-1.152 2.005-2.453 2.005a3.63 3.63 0 0 1-.519-.036z"></path></g></g></g></svg>
                            </div>

                            <div className='flex-item'>
                              <svg viewBox='0 0 36 22' xmlns='http://www.w3.org/2000/svg'><g fillRule='nonzero' fill='none'><path d='M34 0c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H2c-1.1 0-2-.9-2-2V2C0 .9.9 0 2 0h32' fill="#FFF"></path><path d="M17.093 10.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM22.29 12.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75l-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z" fill="#5F6368"></path><path d="M12.986 10.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z" fill="#4285F4"></path><path d="M8.629 14.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H4.577v1.17a4.53 4.53 0 0 0 4.052 2.507z" fill="#34A853"></path><path d="M6.079 11.05a2.709 2.709 0 0 1 0-1.735v-1.17H4.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z" fill="#FBBC04"></path><path d="M8.629 7.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z" fill="#EA4335"></path></g></svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className='xlarge--hide'></div>

                      <div className='shipping_aggrement'>
                        <div>
                          <p>
                            <input type='checkbox' className='cursor-pointer'/>
                            <span>I agree to the shipping terms</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}
