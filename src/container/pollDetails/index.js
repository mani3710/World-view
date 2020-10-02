import React from 'react';
import { Text, View, ActivityIndicator, ScrollView, TouchableOpacity, TextInput, FlatList, Image,Share } from 'react-native';
import { WebView } from 'react-native-webview';
import { Icon, Button, Card } from 'react-native-elements';
import colors from '../../../assets/colors';
import YouTube from 'react-native-youtube';
import YoutubePlayer from "react-native-youtube-iframe";
import ReactPolling from 'react-polling';
import * as Progress from 'react-native-progress';
import ProgressCircle from 'react-native-progress-circle'
import { Divider } from '../../components';
const voteColor = [
    "gray",
    colors.yellow,
    colors.black,

]
const voteAlign = [
    "center",
    "flex-start",
    "flex-end",

]
// import 'react-circular-progressbar/dist/styles.css';
export default class PollDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.route.params.data
        }
    }
    onShare = async () => {
        try {
            let text = `
            poll title : ${this.state.data.title}
            `
            const result = await Share.share({
                message: text,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    renderOpinionBTN(){
      return(
        <Card

            containerStyle={{ elevation: 2, position: "absolute", width: 130, height: 40, borderColor: "transparent", right: 10, bottom: 20, borderRadius: 150 / 2, padding: 0, margin: 0, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
            onPress={()=>{this.props.navigation.navigate("Comments")}}
            style={{ width: "100%", height: "100%", flexDirection: "row" }}>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <Icon
                        name="edit"
                        size={15}
                        color={colors.black}
                    />
                    <Text style={{ fontSize: 10 }}>Write your comment</Text>
                </View>
            </TouchableOpacity>
        </Card>
      );
    }
    renderComments(){
        return(
            <View style={{ width: "100%", paddingBottom: 20 }}>
                            <Divider
                                height={0.3}
                            />
                            <TouchableOpacity
                            onPress={()=>{this.onShare()}}
                             style={{ flexDirection: "row", alignSelf: "center", marginTop: 10, paddingBottom: 10 }}>
                                <Text>SHARE POLL</Text>
                                <Icon
                                    name="share"
                                    size={20}
                                />
                            </TouchableOpacity>
                            <Divider
                                height={0.4}
                            />

                            <Text style={{ fontSize: 18, color: colors.black, fontWeight: "bold", marginTop: 20, marginLeft: 15 }}>COMMENTS</Text>
                            <FlatList
                                data={this.state.data.commends}
                                style={{ width: "100%" }}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{ width: "100%", alignItems: voteAlign[item.votedFor] }}>
                                            <Card containerStyle={
                                                [
                                                    {
                                                        elevation: 4, width: "60%", minHeight: 80, backgroundColor: voteColor[item.votedFor],
                                                        borderColor: "transparent",
                                                        borderTopRightRadius: 30,
                                                        borderTopLeftRadius: 30
                                                    },
                                                    item.votedFor == 1 ? {
                                                        borderBottomLeftRadius: 30
                                                    } : {
                                                            borderBottomRightRadius: 30
                                                        }

                                                ]}>
                                                <View style={{ width: "100%", paddingHorizontal: 10, flexDirection: "row" }}>
                                                    <Image
                                                        source={{ uri: item.image }}
                                                        style={{ width: 40, height: 40, borderRadius: 150 / 2, }}
                                                    />
                                                    <View style={{ marginLeft: 10 }}>
                                                        <Text style={{ fontSize: 14, fontWeight: "bold", color: item.votedFor == 1 ? "black" : "white" }}>{item.name}</Text>
                                                        <Text style={{ fontSize: 10, color: "gray" }}>{item.email}</Text>
                                                    </View>
                                                </View>
                                                <Text style={{ fontSize: 13, color: item.votedFor == 1 ? "black" : "white", lineHeight: 23, opacity: 0.6 }}>{item.commend}</Text>

                                            </Card>
                                        </View>
                                    );
                                }}
                            />

                        </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, backgroundColor: colors.white }}>

                    <View style={{ width: "100%", flexDirection: "row" }}>
                        <Icon
                            name="keyboard-backspace"
                            size={30}
                            color={colors.black}
                            onPress={() => { this.props.navigation.goBack() }}
                            containerStyle={{ marginLeft: 15, padding: 8, alignSelf: "flex-start" }}
                        />
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10, marginLeft: 15 }}>Details</Text>
                    </View>
                    <View style={{ width: "100%", paddingHorizontal: 20, marginTop: 10 }}>

                        <Text style={{ lineHeight: 23, fontSize: 17, fontWeight: "bold", marginBottom: 15 }}>{this.state.data.title}</Text>
                        <YoutubePlayer
                            videoId={`${this.state.data.videoId}`}

                            fullscreen
                            loop
                            height={200}


                        ></YoutubePlayer>
                        <Text style={{ lineHeight: 18, fontSize: 13, marginBottom: 15, color: "gray", marginTop: 15 }}>{this.state.data.description}</Text>

                    </View>
                    {(!this.state.data.isVoted && !this.state.data.isEnded) ?
                        <View style={{ width: "100%", padding: 15, flexDirection: "row", justifyContent: "space-around" }}>
                            <Card
                                containerStyle={{ elevation: 5, borderRadius: 150 / 2, height: 120, width: 120, backgroundColor: colors.yellow, marginBottom: 10, justifyContent: "center", alignItems: "center" }}
                            >
                                <Text style={{ color: colors.black, fontSize: 13, textAlign: "center", fontWeight: "bold" }}>{this.state.data.pollingOption[0].title}</Text>
                            </Card>
                            <Text style={{ color: "gray" }}>Tap to vote</Text>
                            <Card
                                containerStyle={{ elevation: 5, borderRadius: 150 / 2, height: 120, width: 120, backgroundColor: colors.black, marginBottom: 10, justifyContent: "center", alignItems: "center" }}
                            >
                                <Text style={{ color: colors.yellow, fontSize: 13, textAlign: "center", fontWeight: "bold" }}>{this.state.data.pollingOption[1].title}</Text>
                            </Card>
                        </View>
                        :

                        <View style={{ width: "100%", padding: 15, flexDirection: "row", justifyContent: "space-around" }}>
                            <ProgressCircle
                                percent={66}
                                radius={50}
                                borderWidth={8}
                                color={colors.yellow}
                                shadowColor={colors.lightGray}
                                bgColor="#fff"
                            >
                                <Text numberOfLines={3} style={{ fontSize: 7, paddingHorizontal: 5, textAlign: "center" }}>{this.state.data.pollingOption[0].title}</Text>
                                <Text style={{ fontWeight: "bold" }}>66%</Text>
                            </ProgressCircle>

                            <Text style={{ color: "gray",display:this.state.data.voteFor == 0?"none":"flex" }}>You voted for  <Text style={{ color: this.state.data.voteFor == 1 ? colors.yellow : colors.black }}>{this.state.data.voteFor == 1 ? "Yellow" : "Black"}</Text></Text>

                            <ProgressCircle
                                percent={34}
                                radius={50}
                                borderWidth={8}
                                color={colors.black}
                                shadowColor={colors.lightGray}
                                bgColor="#fff"
                            >
                                <Text numberOfLines={3} style={{ fontSize: 7, paddingHorizontal: 5, textAlign: "center" }}>{this.state.data.pollingOption[1].title}</Text>
                                <Text style={{ fontWeight: "bold" }}>34%</Text>
                            </ProgressCircle>
                        </View>

                    }


                    {this.state.data.isVoted ?
                      this.renderComments() :
                      this.state.data.isEnded 
                      ? this.renderComments()
                      :null}



                    <View style={{ height: 50 }} />


                </ScrollView>
                {this.state.data.isVoted ?this.renderOpinionBTN() : this.state.data.isEnded ? this.renderOpinionBTN(): null}
            </View>
        );
    }
}
