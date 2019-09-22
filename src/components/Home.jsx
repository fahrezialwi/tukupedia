import React, { Component } from 'react'
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap'

const items = [
  {
    src: 'https://www.jakartanotebook.com/images/banners/home-banner_(1)1.jpg',
    altText: 'Slide 1'
  },
  {
    src: 'https://www.jakartanotebook.com/images/banners/HB_-Promo-Belanja-Happy.jpg',
    altText: 'Slide 2'
  },
  {
    src: 'https://www.jakartanotebook.com/images/banners/gajian-anti-boros-HB1.jpg',
    altText: 'Slide 3'
  }
]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
        activeIndex: 0
    }
  }

  onExiting = () => {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false;
  }

  next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
        </CarouselItem>
      )
    })

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
        className="mt-5"
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    )
  }
}

export default Home