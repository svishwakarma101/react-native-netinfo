import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
import Carousel, { Pagination } from 'react-native-snap-carousel';
import renderIf from '../utils/InstaremRenderIf';
import {
  APPLIED_THEME as Theme,
  PAGINATION_DOT_POSITION
} from '../utils/Constants';

export default class InstaremSwiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      firstLoad: true
    };
  }

  static propTypes = {
    theme: PropTypes.object,
    pageIndicatorPosition: PropTypes.string,
    startingIndex: PropTypes.number,
    pageIndicator: PropTypes.element,
    pageIndicatorTintColor: PropTypes.string,
    pageIndicatorStyle: PropTypes.object,
    currentPageIndicator: PropTypes.element,
    currentPageIndicatorTintColor: PropTypes.string,
    currentPageIndicatorStyle: PropTypes.object,
    paginationStyle: PropTypes.object,
    cardWidth: PropTypes.number,
    swiperWidth: PropTypes.number,
    onIndexChanged: PropTypes.func,
    horizontal: PropTypes.bool,
    dataSource: PropTypes.array.isRequired,
    inactiveSlideScale: PropTypes.number,
    inactiveDotScale: PropTypes.number,
    inactiveDotOpacity: PropTypes.number,
    isTitleRequired: PropTypes.bool,
    isIndicatorRequired: PropTypes.bool,
    inactiveSlideOpacity: PropTypes.number
  };

  static defaultProps = {
    theme: Theme,
    pageIndicatorPosition: PAGINATION_DOT_POSITION.bottom,
    startingIndex: 0,
    swiperWidth: deviceWidth,
    pageIndicator: null,
    currentPageIndicator: null,
    horizontal: false,
    inactiveSlideScale: 1,
    inactiveSlideOpacity: 1,
    inactiveDotScale: 1,
    inactiveDotOpacity: 1,
    isTitleRequired: false,
    isIndicatorRequired: false
  };

  renderItem({ item, index }) {
    if (this.props.renderItem) {
      return this.props.renderItem(item, index);
    }

    return (
      <View
        style={[
          this.props.horizontal
            ? styles.itemContainerHorizontal
            : styles.itemContainer,
          this.props.style
        ]}
      />
    );
  }

  onIndexChanged(index, carouselReference) {
    this.setState({ activeSlide: index, firstLoad: false });
    if (this.props.onIndexChanged) {
      this.props.onIndexChanged(index, carouselReference);
    }
  }

  render() {
    const {
      theme,
      startingIndex,
      pageIndicator,
      pageIndicatorTintColor,
      pageIndicatorStyle,
      currentPageIndicator,
      currentPageIndicatorTintColor,
      currentPageIndicatorStyle,
      paginationStyle,
      cardWidth,
      swiperWidth,
      horizontal,
      dataSource,
      inactiveSlideScale,
      inactiveDotScale,
      inactiveSlideOpacity,
      inactiveDotOpacity,
      isIndicatorRequired,
      pageIndicatorPosition
    } = this.props;

    let itemWidth = cardWidth ? cardWidth : horizontal ? 100 : 300;

    return (
      <Fragment>
        {renderIf(
          isIndicatorRequired &&
            pageIndicatorPosition === PAGINATION_DOT_POSITION.top
        )(
          <View style={styles.indicatorContainer}>
            <Pagination
              dotsLength={dataSource.length}
              activeDotIndex={
                this.state.firstLoad ? startingIndex : this.state.activeSlide
              }
              containerStyle={
                paginationStyle || styles.paginationContainerStyle
              }
              dotElement={currentPageIndicator}
              dotColor={
                currentPageIndicatorTintColor ||
                theme.Swiper.currentPageIndicatorTintColor
              }
              dotStyle={currentPageIndicatorStyle || styles.indicator}
              inactiveDotElement={pageIndicator}
              inactiveDotColor={
                pageIndicatorTintColor || theme.Swiper.pageIndicatorTintColor
              }
              inactiveDotStyle={pageIndicatorStyle || styles.indicator}
              inactiveDotOpacity={inactiveDotOpacity}
              inactiveDotScale={inactiveDotScale}
              carouselRef={this.carouselReference}
              tappableDots={!!this.carouselReference}
            />
          </View>
        )}

        <View
          style={[
            horizontal ? styles.containerHorizontal : styles.container,
            this.props.style
          ]}
        >
          <Carousel
            {...this.props}
            ref={carousel => (this.carouselReference = carousel)}
            data={dataSource}
            renderItem={this.renderItem.bind(this)}
            sliderWidth={swiperWidth}
            itemWidth={itemWidth}
            firstItem={startingIndex}
            inactiveSlideScale={inactiveSlideScale}
            removeClippedSubviews={false}
            inactiveSlideOpacity={inactiveSlideOpacity}
            onSnapToItem={index =>
              this.onIndexChanged(index, this.carouselReference)
            }
            containerStyle={styles.swiperContainer}
          />
        </View>

        {renderIf(
          isIndicatorRequired &&
            pageIndicatorPosition === PAGINATION_DOT_POSITION.bottom
        )(
          <View
            style={StyleSheet.flatten([
              styles.indicatorContainer,
              styles.indicatorContainerMargin
            ])}
          >
            <Pagination
              dotsLength={dataSource.length}
              activeDotIndex={
                this.state.firstLoad ? startingIndex : this.state.activeSlide
              }
              containerStyle={
                paginationStyle || styles.paginationContainerStyle
              }
              dotElement={currentPageIndicator}
              dotColor={
                currentPageIndicatorTintColor ||
                theme.Swiper.currentPageIndicatorTintColor
              }
              dotStyle={currentPageIndicatorStyle || styles.indicator}
              inactiveDotElement={pageIndicator}
              inactiveDotColor={
                pageIndicatorTintColor || theme.Swiper.pageIndicatorTintColor
              }
              inactiveDotStyle={pageIndicatorStyle || styles.indicator}
              inactiveDotOpacity={inactiveDotOpacity}
              inactiveDotScale={inactiveDotScale}
              carouselRef={this.carouselReference}
              tappableDots={!!this.carouselReference}
            />
          </View>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 260,
    width: '100%',
    zIndex: 10,
    alignItems: 'center'
  },
  swiperContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  containerHorizontal: {
    height: 170,
    width: '100%',
    zIndex: 10,
    alignItems: 'center'
  },
  indicatorContainer: {
    alignItems: 'center',
    height: 40
  },
  indicatorContainerMargin: {
    marginTop: -30
  },
  indicator: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5
  },
  itemContainer: {
    height: 260,
    width: 170,
    alignItems: 'center'
  },
  itemContainerHorizontal: {
    margin: 0,
    height: 170,
    width: 260,
    alignItems: 'center'
  },
  paginationContainerStyle: {
    width: 10
  }
});
