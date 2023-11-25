import { useEffect, useRef, useState } from 'react';
import {
    Platform,
    RefreshControl,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import Lottie from 'lottie-react-native';
import { generateThreads } from '../../utils/generate-dummy-data';
import { Thread } from '../../interfaces/thread';

import ThreadItem from '../../components/ThreadItem';

export default function TabOneScreen() {
    const animationRef = useRef<Lottie>(null);
    const [threads, setThreads] = useState<Thread[]>([]);

    useEffect(() => {
        animationRef?.current?.play();
        setThreads(generateThreads());
    }, []);

    return (
        <SafeAreaView>
            <ScrollView
                contentContainerStyle={{
                    paddingTop: Platform.select({ android: 30 }),
                    paddingHorizontal: 10,
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        tintColor={'transparent'}
                        onRefresh={() => animationRef.current?.play()}
                    />
                }
            >
                <Lottie
                    ref={animationRef}
                    source={require('../../lottie-animations/threads.json')}
                    style={{
                        width: 90,
                        height: 90,
                        alignSelf: 'center',
                    }}
                    loop={false}
                    onAnimationFinish={() => animationRef.current?.pause()}
                />
                {threads.map((thread) => (
                    <ThreadItem key={thread.id} thread={thread} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}
