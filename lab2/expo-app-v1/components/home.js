import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Header from "./Header";
import Stories from "./Stories";
import AllFeeds from "./feeds";
import { StatusBar } from "expo-status-bar";

export default function home() {

    return (
        <>
            <Header title="Insta App" />
            <Stories data={feedData} />
            <AllFeeds feedData={feedData} />
            <StatusBar style="auto" />
        </>
    );
}