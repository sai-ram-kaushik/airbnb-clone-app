import {
    FlatList,
    Image,
    ListRenderItem,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import { Link } from "expo-router";
import { List } from "@/interfaces/listing";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";

interface Props {
    listings: any[];
    category: string;
}

const Listing = ({ listings: items, category }: Props) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<FlatList>(null);
    useEffect(() => {
        console.log("reload listings", items.length);
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200);
    }, [category]);

    const renderRow: ListRenderItem<List> = ({ item }) => (
        <Link href={`/listing/${item.id}`} asChild>
            <TouchableOpacity>
                <Animated.View
                    style={styles.listing}
                    entering={FadeInRight}
                    exiting={FadeOutLeft}
                >
                    <Image
                        source={{ uri: item.medium_url }}
                        style={styles.image}
                    />
                    <TouchableOpacity
                        style={{ position: "absolute", right: 30, top: 30 }}
                    >
                        <Ionicons
                            name="heart-outline"
                            size={24}
                            color={"#000"}
                        />
                    </TouchableOpacity>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ fontFamily: "mon-sb", fontSize: 16 }}>
                            {item.name}
                        </Text>
                        <View style={{ flexDirection: "row", gap: 4 }}>
                            <Ionicons name="star" size={16} />
                            <Text style={{ fontFamily: "mon-sb" }}>
                                {item.review_scores_rating / 20}
                            </Text>
                        </View>
                    </View>

                    <Text style={{ fontFamily: "mon" }}>{item.room_type}</Text>

                    <View
                        style={{
                            flexDirection: "row",
                            gap: 4,
                        }}
                    >
                        <Text style={{ fontFamily: "mon-sb", fontSize: 16 }}>
                            {item.price}
                        </Text>
                        <Text>night</Text>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Link>
    );
    return (
        <View style={defaultStyles.container}>
            <FlatList
                data={loading ? [] : items}
                ref={listRef}
                renderItem={renderRow}
            ></FlatList>
        </View>
    );
};

export default Listing;

const styles = StyleSheet.create({
    listing: {
        padding: 16,
        gap: 10,
        marginVertical: 16,
    },

    image: {
        width: "100%",
        height: 300,
        borderRadius: 10,
    },
});
