import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { LineChart, Grid } from "react-native-svg-charts";
import { Divider, Button } from "react-native-elements";

class App extends Component {
  state = {
    memes: []
  };

  async componentDidMount() {
    const { data } = await axios.get(
      "https://dd0e6d62.ngrok.io/api/meme/month"
    );
    this.setState({ memes: data });
  }

  renderMemes = () => {
    return this.state.memes.map(meme => {
      return (
        <View style={{ marginTop: 10, flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: 300
            }}
          >
            <View>
              <Text style={{ fontSize: 14, textAlign: "left" }}>
                {meme.meme}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end", flexDirection: "row" }}>
              <LineChart
                style={{ height: 40, width: 60, marginRight: 10 }}
                data={meme.formatted}
                svg={{ stroke: "#52c41a" }}
              ></LineChart>
              <Button
                title={meme.value}
                titleStyle={{ fontSize: 14, color: "white" }}
                buttonStyle={{ backgroundColor: "#52c41a" }}
              />
            </View>
          </View>
          <Divider style={{ backgroundColor: "grey", marginTop: 10 }} />
        </View>
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 40, fontWeight: "bold", marginBottom: 20 }}>
          MemeTrends
        </Text>
        {this.renderMemes()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
