import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';

const App: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [isResultShown, setIsResultShown] = useState<boolean>(false);

  const handleInput = (value: string): void => {
    if (isResultShown) {
      if (/\d/.test(value)) {
        // If result is shown and a number is pressed, start fresh
        setInput(value);
        setResult("");
      } else {
        // If result is shown and an operator is pressed, use the result
        setInput(result + value);
      }
      setIsResultShown(false);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleClear = (): void => {
    setInput("");
    setResult("");
    setIsResultShown(false);
  };

  const handleToggleSign = (): void => {
    if (input) {
      if (input.startsWith('-')) {
        setInput(input.substring(1));
      } else {
        setInput('-' + input);
      }
    }
  };

  const handlePercentage = (): void => {
    if (input) {
      const evaluated = eval(input);
      setInput((evaluated / 100).toString());
    }
  };

  const handleCalculate = (): void => {
    try {
      const evaluated = eval(input).toString();
      setResult(evaluated);
      setIsResultShown(true);
    } catch (e) {
      setResult("Error");
    }
  };

  const renderButton = (value: string, onPress: () => void, style?: object) => (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.buttonText, style && style.color ? { color: style.color } : {}]}>
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.resultContainer}>
        <Text style={styles.inputText}>{input}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          {renderButton("C", handleClear, { backgroundColor: "#a6a6a6", color: "#000" })}
          {renderButton("+/-", handleToggleSign, { backgroundColor: "#a6a6a6", color: "#000" })}
          {renderButton("%", handlePercentage, { backgroundColor: "#a6a6a6", color: "#000" })}
          {renderButton("/", () => handleInput("/"), { backgroundColor: "#f09a36" })}
        </View>
        <View style={styles.row}>
          {renderButton("7", () => handleInput("7"))}
          {renderButton("8", () => handleInput("8"))}
          {renderButton("9", () => handleInput("9"))}
          {renderButton("*", () => handleInput("*"), { backgroundColor: "#f09a36" })}
        </View>
        <View style={styles.row}>
          {renderButton("4", () => handleInput("4"))}
          {renderButton("5", () => handleInput("5"))}
          {renderButton("6", () => handleInput("6"))}
          {renderButton("-", () => handleInput("-"), { backgroundColor: "#f09a36" })}
        </View>
        <View style={styles.row}>
          {renderButton("1", () => handleInput("1"))}
          {renderButton("2", () => handleInput("2"))}
          {renderButton("3", () => handleInput("3"))}
          {renderButton("+", () => handleInput("+"), { backgroundColor: "#f09a36" })}
        </View>
        <View style={styles.row}>
          {renderButton("0", () => handleInput("0"), { width: Dimensions.get('window').width / 2.2 })}
          {renderButton(".", () => handleInput("."))}
          {renderButton("=", handleCalculate, { backgroundColor: "#f09a36" })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  resultContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#000',
    padding: 20,
  },
  inputText: {
    fontSize: 40,
    color: '#fff',
  },
  resultText: {
    fontSize: 50,
    color: '#fff',
  },
  buttonsContainer: {
    flex: 5,
    backgroundColor: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  buttonText: {
    fontSize: 30,
    color: '#fff',
  },
});

export default App;
