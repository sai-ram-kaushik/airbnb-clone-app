import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

interface Props {
    listings: any[];
    category: string;
}

const Listing = ({ listings, category }: Props) => {
    useEffect(() => {
        console.log("reload listings");
    }, [category]);
    return (
        <View>
            <Text>Listing</Text>
        </View>
    );
};

export default Listing;

const styles = StyleSheet.create({});
