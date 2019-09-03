//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EventCard from './EventCard';
import { heightPercentageToDP, widthPercentageToDP } from '../../constants/Normalize';
import { FlatList } from 'react-native';

// create a component
class Events extends Component {

    constructor(props) {
        super(props)
        this.state = {
            refreshing: false
        }
    }

    renderEventCard = (props) => {
        return (
          <EventCard data={props.item} index={props.index}/>
        )
      }

    render() {
        return (
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                // contentContainerStyle={{alignItems:'center'}}
                onRefresh={() => {this.props.refresh()}}
                refreshing={this.state.refreshing}
                ListFooterComponent={<View style={{marginRight: heightPercentageToDP('4.5%')}}></View>}
                style={styles.container}
                data={this.props.data}
                renderItem={this.renderEventCard}
                // keyExtractor={(item, index) => item.title + ' ' + item.club + ' ' + item.startDate.seconds + ' ' + index}
            />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingTop: heightPercentageToDP('2%'),
        // paddingBottom: heightPercentageToDP('2%'),
        flex: 1,
        backgroundColor: '#fff',
        maxHeight: heightPercentageToDP('22%'),
        width: widthPercentageToDP('100%'),
        overflow: 'scroll',
    },
});

//make this component available to the app
export default Events;
