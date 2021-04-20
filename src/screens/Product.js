import React, { useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import {
  faCheck, faClock, faGlobe, faTruck
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch, useSelector } from 'react-redux'
import { upper } from 'helper'

import * as cartActions from 'actions/cart'
import * as modalActions from 'actions/modal'
import * as productActions from 'actions/product'
import Modal from 'components/Modal'

export default props => {
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(0)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState({})
  const [selectedColor, setSelectedColor] = useState()
  const [selectedMaterial, setSelectedMaterial] = useState(0)
  const [selectedQuantity, setSelectedQuantity] = useState(0)

  const product = useSelector(state => state.product)
  const modal = useSelector(state => state.modal)
  const currency = useSelector(state => state.currency)

  const handleAddToCart = _ => {
    if (selectedQuantity && selectedSize.id && selectedColor && selectedQuantity > 0) {
      const values = {
        quantity: selectedQuantity,
        sizeId: selectedSize.id,
        colorId: selectedColor
      }

      dispatch(cartActions.addToCart(values))
      dispatch(productActions.changeProductQuantity(values))

      setSelectedSize({})
      setSelectedQuantity(0)
      setSelectedColor()
    } else {
      let error = []

      if (!selectedSize.id) {
        error.push('size')
      }
      if (selectedQuantity === 0) {
        error.push('quantity')
      }
      if (!selectedColor) {
        error.push('color')
      }

      dispatch(cartActions.showError(`Please select the ${error.join(', ')}`))
    }
  }

  const quantityChange = value => {
    if (value !== 0 && quantity >= value) {
      setSelectedQuantity(value)
    }
  }

  const handleSizeChange = size => {
    setSelectedSize({
      id: size.id,
      abbreviation: size.abbreviation
    })
    setSelectedColor()
    setSelectedQuantity(0)
  }

  const handleColorChange = color => {
    if (selectedSize.id) {
      setSelectedColor(color)

      setSelectedQuantity(0)
    } else {
      dispatch(cartActions.showError('Please select size first!'))
    }
  }

  const anyQuantity = size => size.colors.map(s => s.quantity).reduce((a, b) => a + b, 0) > 0 ? true : false;

  if (selectedSize.id && selectedColor) {
    let size = product.sizes.find(size => size.id === selectedSize.id)
    let colorss = size.colors.find(color => color.name === selectedColor)

    if (colorss.quantity !== quantity) {
      setQuantity(colorss.quantity)
    }
  }

  const renderProductSizeColors = _ => {
    let productAllColors = productColors().map(color => color.name)
    let colors = product.colors

    return colors.map((color, index) => (
      (productAllColors.includes(color) && product.sizes.find(s => s.id === selectedSize.id).colors.find(c => c.name === color).quantity !== 0
      ) ? colorRecord(color) : disabledColorRecord(color, index)
    ))
  }

  const colorRecord = color => (
    <li className='product-option-color-list-item' onClick={() => { handleColorChange(color) }} key={color}>
      {
        selectedColor === color &&
          <FontAwesomeIcon icon={faCheck} className='cursor-pointer'/>
      }
      <span className='product-option-color-link cursor-pointer' style={{backgroundColor: color}}></span>
    </li>
  )

  const disabledColorRecord = (color, key) => (
    <li className='product-option-color-list-item color-disabled not-allowed' key={key}>
      <span className='product-option-color-link' style={{backgroundColor: color}}></span>
    </li>
  )

  const productColors = _ => product.sizes.find(size => size.id === selectedSize.id).colors
  const availableQuantities = _ => productColors().find(color => color.name === selectedColor).quantity - selectedQuantity

  return (
    <main role='main' className='product_main'>
      <div>
        <div className='grid-container'>
          <div className='grid-x grid-padding-x'>
            <div className='cell medium-8 large-8 small-12'>
              <div className='grid-x grid-padding-x'>
                <div className='cell medium-3 large-3 small-12  mobile-none'>
                  <div className='product-gallery'>
                    <div className='product-gallery-thumbnails'>
                      {
                        product.images && product.images.map((image, index) => (
                          <span href='/' className='image-container margin-bottom--down-3' key={image.order} onClick={() => setSelectedImage(index)}>
                            <img src={image.url} className='one-whole cursor-pointer' alt='Product' />
                          </span>
                        ))
                      }
                    </div>
                  </div>
                </div>

                <div className='cell medium-9 large-9 small-12 slider_holder'>
                  <div className='mobile-none'>
                    <div className='nowrap large-down--one-whole xlarge--position-left--up-7 xlarge--one-half product-gallery-slides'>
                      {
                        product.images && product.images.map((image, index) => (
                          <div className={`inline-block-middle text-center product-gallery-slide ${selectedImage !== index ? 'xlarge--hide' : ''}`} key={image.order}>
                            <img src={image.url} className='xlarge--position-relative position-3' alt='Product' />
                            <div className='xlarge--extend-background position-full'></div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className='slider_wrap'>
                    <Carousel showStatus={false} showArrows={true} verticalSwipe='standard' swipeable={true}>
                      {
                        product.images.map((image) => (
                          <img src={image.url} className='one-whole cursor-pointer' alt='' key={image.order} />
                        ))
                      }
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>

            <div className='cell medium-4 large-4 small-12'>
              <div className='product-form-content'>
                <div className='product_form_head'>
                  <h1>
                    {product.name}
                  </h1>
                  <h3>
                     {currency['symbol']}{product.price / 100} {currency['title']}
                  </h3>
                </div>

                <div className='product_detail padding-bottom--up-1 select_size_widget'>
                  <h5>
                    <span>
                      Select Your Size
                    </span>
                  </h5>
                  <span onClick={() => { dispatch(modalActions.toggleModal('size_guide')) }} className='view_detail cursor-pointer'>
                    View Size Guide
                  </span>

                  <ul className='list-inline--down-4'>
                    {
                      product.sizes && product.sizes.map((size, index) => (
                        anyQuantity(size) ?
                          <li className='product-option-length-item cursor-pointer' onClick={() => { handleSizeChange(size)}} key={index}>
                            <span className={`product-option-length-link ${selectedSize.abbreviation === size.abbreviation ? 'state--active' : ''}`} data-module-product-option=''>
                              <span className='product-option-length-image'>
                                {size.abbreviation}
                              </span>
                            </span>
                          </li> :
                          <li className='product-option-length-item item-disabled' key={index}>
                            <span className={`product-option-length-link ${selectedSize.abbreviation === size.abbreviation ? 'state--active' : ''}`} data-module-product-option=''>
                              <span className='product-option-length-image'>
                                {size.abbreviation}
                              </span>
                            </span>
                          </li>
                      ))
                    }
                  </ul>
                </div>

                <div className='select_color_widget'>
                  <h5>
                    <span>
                      Select Your Color
                    </span>
                  </h5>
                  <ul className='product-option-color-list'>
                    { (!selectedSize.id && product.colors) && product.colors.map(color => colorRecord(color)) }
                    {
                      selectedSize.id && renderProductSizeColors()
                    }
                  </ul>
                </div>

                <div className='select_material_widget'>
                  <h5>
                    <span>
                      Select Material
                    </span>
                  </h5>
                  <span onClick={() => { dispatch(modalActions.toggleModal('material_info')) }} className='view_detail cursor-pointer'>
                    View Material Guide
                  </span>
                  <ul className='product-option-color-list'>
                    {
                      product.materials && product.materials.map((material, index) => (
                        <li className='product-option-length-item cursor-pointer' onClick={() => { setSelectedMaterial(index) }} key={index}>
                          <span className={`product-option-length-link ${selectedMaterial === index ? 'state--active' : ''}`}>
                            <span className='product-option-length-image'>
                              {upper(material)}
                            </span>
                          </span>
                        </li>
                      ))
                    }
                  </ul>
                </div>

                <div className='select_quantity_widget'>
                  <h5>
                    <span>
                      Select Quantity
                    </span>
                  </h5>
                  <ul className='product-option-quantity-list'>
                    <li>
                      {
                        selectedSize.id &&
                          <span className='state--disabled' onClick={() => { quantityChange(selectedQuantity - 1) }}>
                            -
                          </span>
                      }
                      { !selectedSize.id && <span className='state--disabled'>-</span> }
                    </li>
                    <li>
                      <input type='number' name='updates' value={selectedQuantity} min='0' max={`${quantity}`} readOnly style={{textAlign: 'center'}}/>
                    </li>
                    <li>
                      {
                        selectedSize.id &&
                          <span className='state--disabled' onClick={() => { quantityChange(selectedQuantity + 1) }}>
                            +
                          </span>
                      }
                      { !selectedSize.id && <span className='state--disabled'>+</span> }
                    </li>

                    {
                      selectedColor &&
                        <li className='available-quantity'>
                          Available Quantity: {availableQuantities()}
                        </li>
                    }
                  </ul>
                </div>

                <div className='product-description-widget'>
                  <div id='product-description' className='product-form-rte'>
                    <p>
                      { product.description }
                    </p>
                  </div>
                  <ul>
                    {
                      product.bullets && product.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))
                    }
                  </ul>
                </div>

                <div id='product-form-add-to-cart' className='xlarge--three-quarters large-down--margin-bottom--up-2'>
                  <button type='submit' className='product-add-to-cart cursor-pointer' onClick={handleAddToCart}>
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='xlarge--box-secondary'>
          <div className='grid-container'>
            <div className='grid-bar text-center'>
              <div className='grid-item'>
                  <svg className='icon_box' width='1em' height='1em'>
                    <FontAwesomeIcon icon={faGlobe} />
                  </svg>
                  <div className='line-height--0'>
                    Free worldwide <br/> shipping*
                  </div>
              </div>

              <div className='grid-item'>
                  <svg className='icon_box' width='1em' height='1em'>
                    <FontAwesomeIcon icon={faTruck} />
                  </svg>
                  <div className='line-height--0'>
                    Easy 60-Day <br/> Exchanges &amp; Returns
                  </div>
              </div>

              <div className='grid-item'>
                  <svg className='icon_box' width='1em' height='1em'>
                    <FontAwesomeIcon icon={faClock} />
                  </svg>
                  <div className='line-height--0'>
                    24/7 Customer <br /> Support
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        (modal.isOpen && modal.type === 'size_guide') &&
          <Modal>
            <p>{product.sizeInfo}</p>
          </Modal>
      }
      {
        (modal.isOpen && modal.type === 'material_info') &&
          <Modal>
            <p>{product.materialInfo}</p>
          </Modal>
      }
    </main>
  )
}
