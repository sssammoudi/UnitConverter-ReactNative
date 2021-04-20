import React, {useState, useEffect} from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import convert from 'convert-units'
import { Picker } from '@react-native-community/picker'
import { SimpleLineIcons } from '@expo/vector-icons'

let AlertValue
const MeasureView = ({measure, value, setValue}) => {
    const units = convert().possibilities(measure)
    const [fromUnit, setFromUnit] = useState(units[0]);
    const [toUnit, setToUnit] = useState(units[1]);
    const [valueConverted, setValueConverted] = useState(0)

    useEffect(() => {
        AlertValue = convert(+value).from(fromUnit).to(toUnit)
        setValueConverted(convert(+value).from(fromUnit).to(toUnit).toFixed(3))
    }, [value, fromUnit, toUnit]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Picker style={styles.column} selectedValue={fromUnit} onValueChange={setFromUnit}>
                    {units.map((unit, index)=>(
                        <Picker.Item label={unit} value={unit} key={index} />
                    ))}
                </Picker>
                <View style={styles.column}>
                    <TextInput value={value} onChangeText={setValue} keyboardType="numeric" style={styles.input}/>
                </View>
            </View>
            <SimpleLineIcons
                name="arrow-down-circle"
                size={40}
                color="#20272F"
                style={{ alignSelf: 'center' }}
                onPress={() => {alert(AlertValue)}}
            />
            <View style={styles.row}>
                <Picker style={styles.column} selectedValue={toUnit} onValueChange={setToUnit}>
                    {units.map((unit, index)=>(
                        <Picker.Item label={unit} value={unit} key={index} />
                    ))}
                </Picker>
                <View style={styles.column}>
                    <Text style={[styles.input, { fontSize: 30, fontWeight: 'bold' }]}>
                        {valueConverted}
                    </Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    column: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    },
    input: {
        height: 40,
        borderBottomWidth: 1,
        fontSize: 20,
        textAlign: 'center',
    },
  });
  
export default MeasureView
