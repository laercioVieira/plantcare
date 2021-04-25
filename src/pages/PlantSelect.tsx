import React, { useEffect, useState } from 'react';
import {
    StyleSheet, //
    Text, //
    View, //
    FlatList, //
    ActivityIndicator, //
} from 'react-native';

import { Environment } from '../model/Environment';
import { Plant } from '../model/Plant';

import EnvironmentButton from '../components/EnvironmentButton';
import Header from '../components/Header';
import PlantService from '../services/PlantService';
import PlantCardPrimary from '../components/PlantCardPrimary';
import Load from '../components/Load'

import colors from '../styles/colors';
import fonts from '../styles/fonts';

const LIMIT_FETCH_PLANTSAPI = 6;

export default function PlantSelect() {
    const allEnvironmentItem = {
        key: "all",
        title: "Todos"
    };
    const [environments, setEnvironments] = useState<Environment[]>([]);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [selectedEnvironment, setSelectedEnvironment] = useState<Environment>(allEnvironmentItem);
    const [filteredPlants, setFilteredPlants] = useState<Plant[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(true);
    const [loadedAll, setLoadedAll] = useState(true);

    async function fetchEnvironment() {
        const data = await PlantService.getPlantsEnvironments()
        setEnvironments([
            allEnvironmentItem,
            ...data
        ]);
    }

    async function fetchPlants() {
        const data = await PlantService.getPlants(page, 8)
        if (!data) {
            return setLoading(true);
        }
        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data]);
            setFilteredPlants(plants);
        } else {
            setPlants(data);
            setFilteredPlants(data);
        }
        setLoading(false);
        setLoadingMore(false);
    }

    function handleFechMore(distance: number) {
        if (distance < 1) {
            return;
        }

        setLoadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants();
    }

    function handleSelectEnvironment(item: Environment) {
        setSelectedEnvironment(item);
        if (item.key == 'all') {
            return setFilteredPlants(plants);
        }
        const filtered = plants.filter(plant => plant.environments.includes(item.key));
        return setFilteredPlants(filtered);
    }

    useEffect(() => {
        fetchEnvironment();
    }, []);

    useEffect(() => {
        fetchPlants();
    }, []);


    if (loading) {
        return <Load />
    }

    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <Header />
                <Text style={styles.title} >
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle} >
                    você quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList
                    data={environments}
                    renderItem={({ item }) => (
                        <EnvironmentButton
                            title={item.title}
                            active={item.key == selectedEnvironment?.key}
                            onPress={() => handleSelectEnvironment(item)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            <View style={styles.plants} >
                <FlatList
                    data={filteredPlants}
                    renderItem={({ item }) => (
                        <PlantCardPrimary data={item} />
                    )}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.10}
                    onEndReached={({ distanceFromEnd }) => {
                        handleFechMore(distanceFromEnd);
                    }}
                    ListFooterComponent={
                        loadingMore
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
        fontFamily: fonts.text
    },
    environmentList: {
        height: 40,
        justifyContent: "center",
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: "center"
    }
});