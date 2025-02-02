import {
    Dimensions,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import listingData from "@/assets/data/airbnb-listings.json";
import Animated, {
    FadeIn,
    interpolate,
    SlideInDown,
    useAnimatedRef,
    useAnimatedStyle,
    useScrollViewOffset,
    useSharedValue,
    useAnimatedScrollHandler,
} from "react-native-reanimated";
import { List } from "@/interfaces/listing";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";

const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const listing: List = (listingData as any[]).find((item) => item.id === id);
    const scrollRef = React.useRef<Animated.ScrollView>(null);

    const scrollOffSet = useSharedValue(0);
    const handleScroll = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollOffSet.value = event.contentOffset.y;
        },
    });

    const imageAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollOffSet.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
                    ),
                },
                {
                    scale: interpolate(
                        scrollOffSet.value,
                        [-IMG_HEIGHT, 0, IMG_HEIGHT],
                        [2, 1, 1]
                    ),
                },
            ],
        };
    });
    return (
        <View style={styles.container}>
            <Animated.ScrollView
                onScroll={handleScroll}
                scrollEventThrottle={16}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Animated.Image
                    source={{ uri: listing.xl_picture_url }}
                    style={[styles.image, , imageAnimatedStyle]}
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{listing.name}</Text>
                    <Text style={styles.location}>
                        {listing.room_type} in {listing.smart_location}
                    </Text>
                    <Text style={styles.rooms}>
                        {listing.guests_included} guests . {listing.bedrooms}{" "}
                        bedrooms . {listing.bathrooms} bathrooms
                    </Text>

                    <View style={{ flexDirection: "row", gap: 4 }}>
                        <Ionicons size={16} name="star" />
                        <Text style={styles.ratings}>
                            {listing.review_scores_rating / 20}
                        </Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.hostView}>
                        <Image
                            source={{ uri: listing.host_picture_url }}
                            style={styles.host}
                        />

                        <View>
                            <Text style={{ fontWeight: "500", fontSize: 16 }}>
                                Hosted by {listing.host_name}
                            </Text>
                            <Text>Host since {listing.host_since}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <Text style={styles.description}>
                        {listing.description}
                    </Text>
                </View>
            </Animated.ScrollView>

            <Animated.View
                style={defaultStyles.footer}
                entering={SlideInDown.delay(200)}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity style={styles.footerText}>
                        <Text style={styles.footerPrice}>€{listing.price}</Text>
                        <Text>night</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            defaultStyles.btn,
                            { paddingRight: 20, paddingLeft: 20 },
                        ]}
                    >
                        <Text style={defaultStyles.btnText}>Reserve</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    image: {
        height: IMG_HEIGHT,
        width: width,
    },

    infoContainer: {
        padding: 24,
        backgroundColor: "#fff",
    },

    name: {
        fontSize: 26,
        fontWeight: "bold",
        fontFamily: "mon-sb",
    },

    location: {
        fontSize: 18,
        marginTop: 10,
        fontFamily: "mon-sb",
    },

    rooms: {
        fontSize: 16,
        color: Colors.grey,
        marginVertical: 4,
        fontFamily: "mon",
    },

    ratings: {
        fontSize: 16,
        fontFamily: "mon-sb",
    },

    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.grey,
        marginVertical: 16,
    },

    host: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.grey,
    },

    hostView: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },

    footerText: {
        height: "100%",
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },

    footerPrice: {
        fontSize: 18,
        fontFamily: "mon-sb",
    },

    roundButton: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        color: Colors.primary,
    },

    bar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    header: {
        backgroundColor: "#fff",
        height: 100,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.grey,
    },

    description: {
        fontSize: 16,
        marginTop: 10,
        fontFamily: "mon",
    },
});
