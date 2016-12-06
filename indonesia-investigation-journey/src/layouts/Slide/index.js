/* eslint-disable react/no-find-dom-node */
import React, { Component, PropTypes } from "react"
import ReactHowler from "react-howler"
import { Link } from "react-router"
import classnames from "classnames"
import raf from "raf" // requestAnimationFrame polyfill

import WindowSizeMixin from "../WindowSizeMixin"
import Page from "../Page"
import styles from "./Slide.scss"
import commonStyles from "../../styles/common.scss"
import LeftNavButton from "../../components/Navigation/LeftNavButton"
import RightNavButton from "../../components/Navigation/RightNavButton"
import CirclePlayButton from "../../components/Navigation/CirclePlayButton"
import Header from "../../components/Header"
import VideoPlayer from "../../components/Multimedia/VideoPlayer"

import { PHOTOS, VIDEOS, AUDIOS } from "./multimedia.js"

class Slide extends WindowSizeMixin(Component) {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: false,
      scrollPercent: 0,
      isMute: false,
      isPlaying: true,
      percentage: 0,
    }
    this.getPhotoByIndex = this.getPhotoByIndex.bind(this)
    this.getVideoByIndex = this.getVideoByIndex.bind(this)
    this.startAudioProgressSeek = this.startAudioProgressSeek.bind(this)
    this.renderSeekPercent = this._renderSeekPercent.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  componentDidMount() {
    if (super.componentDidMount) super.componentDidMount()
    this.startAudioProgressSeek()
    window.addEventListener("keydown", this.handleKeyPress)
  }

  componentWillUnmount() {
    this.clearRAF()
    window.removeEventListener("keydown", this.handleKeyPress)
  }

  startAudioProgressSeek() {
    const { slideIndex } = this.props.head
    const isAudio = (AUDIOS[slideIndex] && AUDIOS[slideIndex].audio)
    this.clearRAF()
    if(isAudio) {
      this.setState({isPlaying: true})
      this.renderSeekPercent(isAudio)
    } else {
      this.setState({isPlaying: false})
    }
  }

  componentDidUpdate(prevProps) {
    const { slideIndex } = this.props.head
    if(prevProps.head.slideIndex !== slideIndex) {
      this.startAudioProgressSeek()
    }
  }

  getPhotoByIndex(slideIndex) {
    const { isMobile, isPortrait } = this.state
    let retPhoto = null
    if(PHOTOS[slideIndex] && PHOTOS[slideIndex].photo && PHOTOS[slideIndex].photoMobile) {
      const mobilePath = require(`../../../content/assets/${PHOTOS[slideIndex].photoMobile}`)
      const desktopPath = require(`../../../content/assets/${PHOTOS[slideIndex].photo}`)
      retPhoto = (isMobile && isPortrait) ? mobilePath : desktopPath
    }
    return retPhoto
  }

  getVideoByIndex(slideIndex) {
    const { isMobile, isPortrait } = this.state
    let retVideo = null
    if(VIDEOS[slideIndex] && VIDEOS[slideIndex].video && VIDEOS[slideIndex].videoMobile) {
      const mobilePath = require(`../../../content/assets/${VIDEOS[slideIndex].videoMobile}`)
      const desktopPath = require(`../../../content/assets/${VIDEOS[slideIndex].video}`)
      retVideo = (isMobile && isPortrait) ? mobilePath : desktopPath
    }
    return retVideo
  }

  getAudioByIndex(slideIndex) {
    if(AUDIOS[slideIndex] && AUDIOS[slideIndex].audio) {
      return require(`../../../content/assets/${AUDIOS[slideIndex].audio}`)
    }
    return null
  }

  getPreLink(slideIndex) {
    return (slideIndex <= 0) ? '/' : `/posts/${slideIndex}/`
  }

  getNextLink(slideIndex) {
    const totalSlides = this.context.metadata.totalSlides
    return (slideIndex+2 > totalSlides) ? null : `/posts/${slideIndex + 2}/`
  }

  handleKeyPress(evt) {
    const { slideIndex } = this.props.head
    evt = evt || window.event;
    switch (evt.keyCode) {
      case 37:
        this.context.router.replace(this.getPreLink(slideIndex))
        break
      case 39:
        this.context.router.replace(this.getNextLink(slideIndex))
        break
    }
  }

  clearRAF() {
    raf.cancel(this._raf)
  }

  _renderSeekPercent(isAudio) {
    if (isAudio) {
      if(this.audio){
        this.setState({
          percentage: Math.floor(this.audio.seek() * 100 / this.audio.duration()),
        })
      }
      this._raf = raf(this.renderSeekPercent)
    }
  }

  render() {
    const { isMobile, isTablet, isMute, percentage } = this.state
    const { head, body } = this.props
    const { slideIndex } = head
    const totalSlides = this.context.metadata.totalSlides

    const preIndex = (slideIndex-1 < 0) ? -1 : slideIndex-1
    const nextIndex = (slideIndex+1 >= totalSlides) ? -1 : slideIndex+1

    const previousLink = this.getPreLink(slideIndex)
    const nextLink = this.getNextLink(slideIndex)

    const isVideo = (VIDEOS[slideIndex] && VIDEOS[slideIndex].videoMobile)
    const isAudio = (AUDIOS[slideIndex] && AUDIOS[slideIndex].audio)

    const bgPhoto = this.getPhotoByIndex(slideIndex)
    const videoSource = this.getVideoByIndex(slideIndex)
    const audioSource = this.getAudioByIndex(slideIndex)

    const prePhoto = (preIndex>=0) ? this.getPhotoByIndex(preIndex) : null
    const preVideo = (preIndex>=0) ? this.getVideoByIndex(preIndex) : null
    const preAudio = (preIndex>=0) ? this.getAudioByIndex(preIndex) : null

    const nextPhoto = (nextIndex>=0) ? this.getPhotoByIndex(nextIndex) : null
    const nextVideo = (nextIndex>=0) ? this.getVideoByIndex(nextIndex) : null
    const nextAudio = (nextIndex>=0) ? this.getAudioByIndex(nextIndex) : null

    const Video = isVideo ?
      <VideoPlayer source={videoSource} />
      : null

    const pageDate = head.date ? new Date(head.date) : null
    return (
      <Page
        { ...this.props }
        header={
          <header>
            {
            pageDate &&
            <time key={ pageDate.toISOString() }>
              { pageDate.toDateString() }
            </time>
          }
          </header>
        }
         onKeyPress={this.handleKeyPress}
      >
        <div className={ styles["container"] }>

          {/* Preload Image and Video */}
          <div className={ commonStyles["hide"] }>
            <img src={prePhoto} className={ styles["image"] }/>
            <img src={nextPhoto} className={ styles["image"] }/>
            <video width="10" muted>
              <source src={preVideo} type="video/webm"/>
            </video>
            <audio width="10" muted>
              <source src={preAudio} type="audio/ogg"/>
            </audio>
            <video width="10" muted>
              <source src={nextVideo} type="video/webm"/>
            </video>
            <audio width="10" muted>
              <source src={nextAudio} type="audio/ogg"/>
            </audio>
          </div>
          {/* End - Preload Image and Video */}

          <img src={bgPhoto}
            className={ styles["image"] }
             ref={(ref) => this.imageBox = ref}
          />

          { Video }
          <div className={styles["bg-overlay"]}></div>
          <div className={styles["bottom-box"]}>
            <div className={ classnames(commonStyles["content-outer"], styles["description"]) }>
              <div
                dangerouslySetInnerHTML={ { __html: body } }
              />
            </div>
          </div>
          <div ref={(ref) => this.preBtn = ref}>
            <Link to={previousLink}>
              <div className={ styles["left-button"] } >
                <LeftNavButton isMobile={isMobile} isTablet={isTablet}/>
              </div>
            </Link>
          </div>
          <div ref={(ref) => this.nextBtn = ref}>
            {
              (slideIndex+2 > totalSlides) ? null :
              <Link to={nextLink}>
                <div className={ styles["right-button"] } >
                  <RightNavButton isMobile={isMobile} isTablet={isTablet}/>
                </div>
              </Link>
            }
          </div>
        </div>

        {
          isVideo ?
          <div className={styles["audio-button"]}
            onClick={()=>{
              this.setState({isMute: !isMute})}
            }
          >
            <CirclePlayButton isMute={isMute}
              percentage={ percentage }
            />
          </div> : null
        }

        {
          isAudio ?
          <ReactHowler
            src={ audioSource }
            loop={ true }
            mute={ isMute }
            ref={(ref) => this.audio = ref}
          /> : null
        }

        <Header {...this.props}/>
      </Page>
    )
  }

}

Slide.contextTypes = {
  metadata: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
}

Slide.propTypes = {
  head: PropTypes.object.isRequired,
}

export default Slide
