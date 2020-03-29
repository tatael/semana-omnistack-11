import React, { useState, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'
import api from '../../services/api'
import styles from './styles'
import logoImg from '../../assets/logo.png'

export default function Incidents() {
	const [ incidents, setIncidents ] = useState([ ])
	const [ total, setTotal ] = useState(0)
	const [ page, setPage ] = useState(1)
	const [ loading, setLoading ] = useState(false)
	const navigation = useNavigation()

	function onNavigateToDetail(incident) {
		navigation.navigate('Details', { incident })
	}

	async function onLoadIncidents() {
		if (loading) {
			return
		}

		if (total > 0 && incidents.legth == total) {
			return
		}

		setLoading(true)

		const response = await api.get('incidents', {
			params: { page }
		})

		setIncidents([... incidents, ... response.data])
		setTotal(response.headers['x-total-count'])
		setPage(page + 1)
		setLoading(false)
	}

	useEffect(() => { 
		onLoadIncidents()	
	}, [ ])

	return (
		<View style={styles.container}>
			<View styles={styles.header}>
				<Image source={logoImg} />
				
				<Text style={styles.headerText}>
					Total de <Text style={styles.headerTextBold}>{total}</Text> casos.
				</Text>
			</View>

			<Text style={styles.title}> Bem-vindo! </Text>	
			<Text style={styles.description}> Escolha um dos casos abaixo e salve o dia. </Text>

			<FlatList
				style={styles.incidentList}
				data={ incidents }
				keyExtractor={incident => String(incident.id)}
				showsVerticalScrollIndicator={false}
				onEndReached={onLoadIncidents}
				onEndReachedThreshold={0.2}
				renderItem={({ item: incident }) => (
					<View style={styles.incident}>
						<Text style={styles.incidentProperty}> ONG: </Text>
						<Text style={styles.incidentValue}> { incident.name } </Text>
						
						<Text style={styles.incidentProperty}> Caso: </Text>
						<Text style={styles.incidentValue}> { incident.title } </Text>
						
						<Text style={styles.incidentProperty}> Valor: </Text>
						<Text style={styles.incidentValue}> {
							Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL'
							}).format(incident.value)
						}
						</Text>

						<TouchableOpacity
							styles={styles.detailsButton}
							onPress={() => onNavigateToDetail(incident)}
						>
							<Text style={styles.detailsButtonText}> Ver mais detalhes </Text>
							<Feather name="arrow-right" size={16} color="#E02041" />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	)
}