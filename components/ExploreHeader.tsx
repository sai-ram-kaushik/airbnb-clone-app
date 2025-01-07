import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as Haptics from "expo-haptics";

const category = [
    { name: "Tiny homes", icon: "home" },
    { name: "Cabins", icon: "house-siding" },
    { name: "Trending", icon: "local-fire-department" },
    { name: "Play", icon: "videogame-asset" },
    { name: "City", icon: "appartment" },
    { name: "Beachfront", icon: "beach-access" },
    { name: "Beachfront", icon: "beach-access" },
];

interface Props {
    onCategoryChanged: (category: string) => void;
}

const ExploreHeader = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemsRef = useRef<Array<React.RefObject<View>>>([]);

    const [activeIndex, setActiveIndex] = useState(0);

    const selectCategory = (idx: number) => {
        const selectedRef = itemsRef.current[idx]?.current;

        if (selectedRef) {
            selectedRef.measure((x) => {
                scrollRef.current?.scrollTo({
                    x: x - 16,
                    y: 0,
                    animated: true,
                });
            });
        }

        setActiveIndex(idx);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onCategoryChanged(category[idx].name)
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                <View style={styles.actionRow}>
                    <Link href={"/(modals)/booking"} asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name="search" size={24} />
                            <View>
                                <Text style={{ fontFamily: "mon-sb" }}>
                                    Where to?
                                </Text>
                                <Text
                                    style={{
                                        fontFamily: "mon",
                                        color: Colors.grey,
                                    }}
                                >
                                    Anywhere . Any week
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={24} />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    horizontal
                    ref={scrollRef}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: "center",
                        gap: 30,
                        paddingHorizontal: 16,
                    }}
                >
                    {category.map((item, idx) => {
                        if (!itemsRef.current[idx]) {
                            itemsRef.current[idx] = React.createRef<View>();
                        }
                        return (
                            <TouchableOpacity
                                key={idx}
                                ref={itemsRef.current[idx]}
                                style={
                                    activeIndex === idx
                                        ? styles.categoriesBtnActive
                                        : styles.categoriesBtn
                                }
                                onPress={() => selectCategory(idx)}
                            >
                                <MaterialIcons
                                    name={item.icon as any}
                                    size={24}
                                    color={
                                        activeIndex === idx
                                            ? "#000"
                                            : Colors.grey
                                    }
                                />
                                <Text
                                    style={
                                        activeIndex === idx
                                            ? styles.categoryTextActive
                                            : styles.categoryText
                                    }
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ExploreHeader;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: 130,
    },

    actionRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingBottom: 16,
        gap: 10,
    },

    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.grey,
        borderRadius: 24,
    },

    searchBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderColor: "#c2c2c2",
        borderWidth: StyleSheet.hairlineWidth,
        flex: 1,
        padding: 14,
        borderRadius: 30,
        backgroundColor: "#fff",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: {
            width: 1,
            height: 1,
        },
    },

    categoryText: {
        fontSize: 14,
        fontFamily: "mon-sb",
        color: Colors.grey,
    },

    categoryTextActive: {
        fontSize: 14,
        fontFamily: "mon-sb",
        color: "#000",
    },

    categoriesBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 8,
    },

    categoriesBtnActive: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderBottomColor: "#000",
        borderBottomWidth: 2,
        paddingBottom: 8,
    },
});
