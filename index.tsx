import React, { useState, useRef, ReactNode, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import stepview from './stepView'

interface Props {
    transitionDuration: number,
    dots: boolean,
    dotsColor: string,
    dotsDisabledColor: string,
    dotsSize: number,
    dotsDistance: number,
    dotsMargin: number,
    dotsPosition: 'Top' | 'Bottom'
    children: Array<ReactNode>,
    step: number,
};

export const StepView = stepview;

export function StepNavigation(props: Props) {
    const { step } = props;
    const steps = props.children.length;
    const [width, setWidth] = useState(0)

    const viewRef = useRef(null)
    useEffect(() => {
        if (viewRef != null && viewRef.current != null) {
            viewRef.current.transitionTo({ marginLeft: width / steps * (step - 1) * (-1) }, props.transitionDuration)
        }
    }, [props.step])

    const dotsStyle = StyleSheet.create({
        dot: {
            height: props.dotsSize,
            width: props.dotsSize,
            backgroundColor: '#aaa',
            borderRadius: props.dotsSize / 2,
            marginLeft: props.dotsDistance,
        }
    })

    let Dots = []
    for (let index = 0; index < steps; index++) {
        Dots.push(<View key={index} style={[dotsStyle.dot, { backgroundColor: index + 1 == step ? props.dotsColor : props.dotsDisabledColor }]} />)
    }

    //let dotMargin = { top: props.dotsMargin}
    let dotMargin = {}
    if (props.dotsPosition == 'Top') {
        dotMargin = { top: props.dotsMargin }
    }
    else {
        dotMargin = { bottom: props.dotsMargin }
    }

    return (

        <View style={{ flexGrow: 1 }}>
            <Animatable.View
                onLayout={(event) => {
                    var { x, y, width, height } = event.nativeEvent.layout;
                    setWidth(width);
                }}
                ref={viewRef} style={[styles.container, { width: `${100 * steps}%`, }]}
            >
                {
                    props.children
                }
            </Animatable.View>
            <View style={[styles.dotsContainer, dotMargin]}>
                {
                    props.dots && Dots
                }
            </View>
        
        </View>
    );
}

StepNavigation.defaultProps = {
    transitionDuration: 800,
    dots: true,
    dotsColor: 'blue',
    dotsDisabledColor: '#aaa',
    dotsSize: 20,
    dotsDistance: 5,
    dotsPosition: 'Top',
    dotsMargin: 60,
    step: 1
}

const styles = StyleSheet.create({
    dotsContainer: {
        //backgroundColor: '#aaa',
        left: '0%',
        width: '100%',
        height: 30,
        position: 'absolute',
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dot: {
        height: 20,
        width: 20,
        backgroundColor: '#aaa',
        borderRadius: 10,
        marginLeft: 5
    },
    container: {
        flexGrow: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },

});