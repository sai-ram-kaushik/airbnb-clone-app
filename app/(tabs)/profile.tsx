import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

const Page = () => {
    const { signOut, isSignedIn } = useAuth();
    const router = useRouter();
    return (
        <View>
            <Button title="signout" onPress={() => signOut()} />
            {!isSignedIn && (
                <Text onPress={() => router.push("/(modals)/login")}>
                    Login
                </Text>
            )}
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({});
