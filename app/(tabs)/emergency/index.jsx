import { View, Text, Pressable, Animated, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import { useRouter } from "expo-router"

export default function EmergencyScreen() {
    const router = useRouter()
    const [isRecording, setIsRecording] = useState(false)
    const [emergencyType, setEmergencyType] = useState(null)
    const buttonScale = useRef(new Animated.Value(1)).current
    const pulseAnim = useRef(new Animated.Value(1)).current

    const startPulseAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.08,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start()
    }

    const simulateRecording = () => {
        setIsRecording(true)
        startPulseAnimation()
        // Simulate AI classification after 2 seconds
        setTimeout(() => {
            const types = ['Fire', 'Medical', 'Crime']
            setEmergencyType(types[Math.floor(Math.random() * types.length)])
            setIsRecording(false)
        }, 2000)
    }

    const animateButton = () => {
        Animated.sequence([
            Animated.timing(buttonScale, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(buttonScale, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start()
    }

    const handleSendAlert = () => {
        animateButton()
        router.push("/emergency/confirmation")
    }

    return (
        <View className="flex-1 bg-slate-900 p-8">
            <View className="flex-1 items-center justify-center space-y-20">
                <Animated.View style={{ transform: [{ scale: isRecording ? pulseAnim : 1 }] }}>
                    <Pressable
                        onPress={simulateRecording}
                        disabled={isRecording}
                        className={`w-56 h-56 rounded-full items-center justify-center ${
                            isRecording ? 'bg-rose-600' : 'bg-rose-500'
                        } shadow-lg shadow-rose-500/50`}
                        accessibilityLabel="Start voice recording for emergency"
                        accessibilityHint="Press to start recording your emergency message"
                    >
                        {isRecording ? (
                            <View className="items-center space-y-4">
                                <ActivityIndicator size="large" color="white" />
                                <Text className="text-white text-xl font-bold">Recording...</Text>
                            </View>
                        ) : (
                            <Text className="text-white text-2xl font-bold">Start Recording</Text>
                        )}
                    </Pressable>
                </Animated.View>

                {emergencyType && (
                    <View className="items-center space-y-8 mt-10">
                        <Text className="text-rose-400 text-2xl font-bold">
                            Detected: {emergencyType} Emergency
                        </Text>
                        <View className="items-center space-y-4">
                            
                            <Text className="text-slate-300 text-xl text-center mb-2">
                                Dispatching emergency services...
                            </Text>
                            <ActivityIndicator size="large" color="#fb7185" />
                        </View>
                    </View>
                )}

                <Animated.View 
                    style={{ transform: [{ scale: buttonScale }] }}
                    className="w-full mt-20"
                >
                    <Pressable
                        onPress={handleSendAlert}
                        className="bg-rose-500 p-4 rounded-3xl w-full shadow-lg shadow-rose-500/50"
                        accessibilityLabel="Send emergency alert"
                        accessibilityHint="Press to send emergency alert to services"
                    >
                        <Text className="text-white text-lg font-bold text-center">
                            Send Alert
                        </Text>
                    </Pressable>
                </Animated.View>
            </View>
        </View>
    )
}