import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listing from "@/components/Listing";

const Page = () => {
    const [category, setCategory] = useState("Tiny homes");
    const onDataChange = (category: string) => {
        console.log("changed", category);
        setCategory(category)
    };
    return (
        <View style={{ flex: 1, marginTop: 130 }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <ExploreHeader onCategoryChanged={onDataChange} />
                    ),
                }}
            />
            <Listing listings={[]} category={category}/>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({});
