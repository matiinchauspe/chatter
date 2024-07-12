/* eslint-disable no-undef */

import { useState } from 'react'
import cx from 'classnames'

import { getInitials } from '@/utils'
import { useLatestMessages } from '@/hooks'

import './_contact-panel.scss'

export default function ContactPanel () {
  const [minimised, setMinimised] = useState(Boolean(localStorage.getItem('minimised')))

  const { selectedUser } = useLatestMessages()

  const isBot = selectedUser.userId === 'bot'

  const onClick = () => {
    // Remember user preference
    localStorage.setItem('minimised', minimised ? '' : 'true')

    setMinimised(!minimised)
  }

  return (
    <div className={cx('contact-panel', { 'contact-panel--minimised': minimised })}>
      <div className='contact-panel__header' style={{ backgroundColor: selectedUser.color ?? '#4DB8EF' }}>
        <i className='mdi mdi-exit-to-app contact-panel__toggle' onClick={onClick} />
        <div className='contact-panel__header__profile'>
          <div className='contact-panel__header__profile__picture'>{isBot ? <i className='fas fa-comment-dots' /> : getInitials(selectedUser.name)}</div>
          <h1>{selectedUser.name}</h1>
        </div>
      </div>
      <div className='contact-panel__body'>
        <div className='contact-panel__body__block'>
          <p className='contact-panel__body__label'>Email</p>
          <p className='contact-panel__body__value'>{selectedUser.email}</p>
        </div>
        <div className='contact-panel__body__block'>
          <p className='contact-panel__body__label'>Phone</p>
          <p className='contact-panel__body__value'>{selectedUser.phone}</p>
        </div>
        {Boolean(selectedUser.labels.length) && (
          <div className='contact-panel__body__block'>
            <p className='contact-panel__body__label'>Labels</p>
            <div className='contact-panel__body__labels'>
              {selectedUser.labels.map(label => (
                <p key={label}>{label}<i className='fas fa-times' /></p>
              ))}
            </div>
          </div>
        )}
        {Boolean(selectedUser.attachments.length) && (
          <div className='contact-panel__body__block'>
            <p className='contact-panel__body__label'>Attachments</p>
            <div className='contact-panel__body__attachments'>
              <p><i className='fas fa-paperclip' />Dataset.csv</p>
              <p><i className='far fa-image' />bot_face.jpg</p>
            </div>
            <p className='contact-panel__body__link'>View All</p>
          </div>
        )}
        <button className='contact-panel__body__edit-btn'>Edit Contact</button>
      </div>
    </div>
  )
}
