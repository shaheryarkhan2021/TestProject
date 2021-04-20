import React, { useState } from 'react'
import { Launcher } from 'react-chat-window'
import ReduxToastr from 'react-redux-toastr'
import { Switch, Route } from 'react-router'
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import 'assets/index.css'
import Cart from 'screens/Cart'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Product from 'screens/Product'

export default _ => {
  const [messageList, setMessageList] = useState([
    {
      author: 'react-chat-window',
      data: { text: 'Hey! We are live, let us know your query!' },
      type: 'text'
    }
  ])

  const currentHour = new Date().getHours();

  const onMessageWasSent = msg => {
    let messages = [...messageList]
    messages.push(msg)
    setMessageList(messages)
  }

  return (
    <div className="App" style={{position: 'relative'}}>
      <div style={{overflow: 'hidden'}}>
        <Header />

        <Switch>
          <Route exact path='/' component={Product} />
          <Route exact path='/cart' component={Cart} />
        </Switch>

        <Footer />
      </div>

      {
        currentHour > 9 && currentHour < 17 &&
          <Launcher
            agentProfile={{
              teamName: 'Chat Box',
              imageUrl: 'https://placeimg.com/40/40/people/sepia'
            }}
            messageList={messageList}
            onMessageWasSent={onMessageWasSent}
            showEmoji
          />
      }

      <ReduxToastr
        timeOut={3000}
        newestOnTop={false}
        preventDuplicates
        position='bottom-center'
        transitionIn='fadeIn'
        transitionOut='fadeOut'
        progressBar
        closeOnToastrClick
      />
    </div>
  );
}
