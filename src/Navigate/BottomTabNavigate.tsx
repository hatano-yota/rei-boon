import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { FlashCardsCreateCon } from '../screens/FlashCardsCreate/UI/FlashCardsCreateCon';
import { SearchCon } from '../screens/Search/UI/SearchCon';
import { SettingCon } from '../screens/Setting/UI/SettingCon';
import { FlashCardsListNavigate } from './FlashCardsListNavigate';
import { FC, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { useRecoilState } from 'recoil';
import { APIKeyState } from '../atom/APIKeyState';
import { getData, setData } from '../lib/DataSave';
import {
	FlashCardsDataState,
	FlashCardsDef,
} from '../atom/FlashCardsDataState';

export const BottomTabNavigate: FC = () => {
	const Tab = createBottomTabNavigator();

	const [apiKey, setApiKey] = useRecoilState(APIKeyState);
	const [data, setCardsData] =
    useRecoilState<FlashCardsDef[]>(FlashCardsDataState);
	const [isDone, setIsDone] = useState(false);

	useEffect(() => {
		(async () => {
			if (!isDone) {
				setIsDone(true);
				const key = await getData('APIKey');
				const saveData = await getData('FlashCardsData');
				if (saveData !== '') {
					setCardsData(() => JSON.parse(saveData));
				}
				if (key !== '') {
					setApiKey(() => key);
				}
			} else {
				await setData('APIKey', apiKey);
				await setData('FlashCardsData', JSON.stringify(data));
			}
		})();
	}, [apiKey, data]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={() => ({
						tabBarActiveTintColor: 'green',
						tabBarInactiveTintColor: 'gray',
						headerStyle: {
							backgroundColor: '#79BC6E', // ヘッダーの背景色を指定
						},
						headerTintColor: 'white', // ヘッダーのテキスト色を指定
						headerTitleAlign: 'center',
					})}
				>
					<Tab.Screen
						name="Home"
						component={FlashCardsListNavigate}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="ios-home" size={size} color={color} />
							),
							title: '単語帳一覧',
							headerShown: false,
						}}
					/>
					<Tab.Screen
						name="Create"
						component={FlashCardsCreateCon}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="add-outline" size={size} color={color} />
							),
							title: '単語帳作成',
						}}
					/>
					<Tab.Screen
						name="Search"
						component={SearchCon}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="search-outline" size={size} color={color} />
							),
							title: '単語検索',
						}}
					/>
					<Tab.Screen
						name="Setting"
						component={SettingCon}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons
									name="md-settings-outline"
									size={size}
									color={color}
								/>
							),
							title: '設定',
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
};
