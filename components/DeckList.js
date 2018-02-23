import React, { Component} from 'react';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { Badge, Card } from 'react-native-elements';
import { fetchDeckDB } from '../actions';

class DeckList extends Component {
  componentDidMount() {
    this.props.fetchDeckDB();
  }

  componentDidUpdate() {
    this.props.fetchDeckDB();
  }

  deckItem = ({ item }) =>
    <TouchableOpacity
      onPress={() =>
        this.props.navigation.navigate("Deck", {
          entryId: item.key,
          navTitle: item.title
        })
      }
    >
      <View>
        <Card title={item.title} subtitle={`${item.questions.length} cards`}>
          <Badge containerStyle={{ backgroundColor: "lightblue" }}>
            <Text>{`${item.questions.length} cards`}</Text>
          </Badge>
        </Card>
      </View>
    </TouchableOpacity>;

  render() {
    return (
    <View style={styles.containerStyle}>
        {this.props.DBdata.length > 0
          ?
          <FlatList
            data={this.props.DBdata}
            deckItem={this.renderItem}
          />
          : <Card title="Create a deck to get started!"/>
        }
    </View>
    )
  }
}

const styles = {
  containerStyle: {
    flex: 1,
    alignSelf: "stretch"
  }
};

const mapStateToProps = state => {
  const DBdata = state.decks;

  return { DBdata };
};

export default connect(mapStateToProps, { fetchDeckDB })(DeckList);

