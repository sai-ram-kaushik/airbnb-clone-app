import { StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listing from "@/components/Listing";
import listingData from '@/assets/data/airbnb-listings.json'

const Page = () => {
    const [category, setCategory] = useState("Tiny homes");
    const items = useMemo(() => listingData as any, [])
    const onDataChange = (category: string) => {
        console.log("changed", category);
        setCategory(category)
    };
    return (
        <View style={{ flex: 1, marginTop: 95 }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <ExploreHeader onCategoryChanged={onDataChange} />
                    ),
                }}
            />
            <Listing listings={items} category={category}/>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({});
