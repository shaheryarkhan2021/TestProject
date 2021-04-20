import * as types from './actionTypes';

export const toggleModal = payload => {
  if (document.getElementsByTagName('body')[0].classList.contains('overflow-hidden')) {
    document.getElementsByTagName('body')[0].classList.remove('overflow-hidden')
  } else {
    window.scrollTo(0, 0)
    let classes = document.getElementsByTagName('body')[0].className
    classes = classes += ' overflow-hidden'
    document.getElementsByTagName('body')[0].classList = classes
  }

  return {
    type: types.TOGGLE_MODAL,
    payload
  }
}
