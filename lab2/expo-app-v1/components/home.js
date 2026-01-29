import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import Stories from "./Stories";
import AllFeeds from "./feeds";
import { StatusBar } from "expo-status-bar";
import feedData from '../data/feed.json';

export default function Home() {

    return (
        <>
            <Header title="CPSC" />
            <Stories data={feedData} />
            <AllFeeds feedData={feedData} />
            <StatusBar style="auto" />
        </>
    );
}