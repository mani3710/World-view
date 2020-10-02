import React from 'react';
import {Text,View,Image,KeyboardAvoidingView,TextInput} from 'react-native';
import {Icon } from 'react-native-elements';
import colors from '../../../assets/colors';
export default class CommentScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            commentText:""
        }
        this.userCommentTextInput ={}
    }
    render(){
        return(
            <View
                style={{ flex: 1, backgroundColor: colors.white }}
            >
                <View style={{ width: "100%", flexDirection: "row", marginTop: 27 }}>
                    <Icon
                        onPress={() => { this.props.navigation.goBack() }}
                        name="arrow-back"
                        size={25}
                        color={"#000000"}
                        containerStyle={{ marginLeft: 20, marginTop: 3 }}
                    />
                    <Text
                        style={{ width: 183, color: colors.Black, fontSize: 20, fontWeight: "700", marginLeft: 20 }}
                    >YOUR COMMENTS</Text>
                    <Text
                    onPress={()=>{this.submit()}}
                        style={{  fontSize: 18, fontWeight: "bold", paddingHorizontal: 10, marginLeft: 50,opacity:this.state.commentText ? 1:0.54 }}
                    >Post</Text>
                </View>


                <View style={{ flex: 1, flexDirection: "row", marginTop: 18, marginHorizontal: 15 }}>  
                    <View style={{ width: "88%", height: "100%", marginLeft: 10 }}>
                        <KeyboardAvoidingView
                            style={{

                                flex: 1,
                                paddingHorizontal: 4,
                                borderRadius: 18,

                                marginRight: 4,
                            }}
                            behavior={'padding'}
                            keyboardVerticalOffset={48}

                        >

                            <TextInput
                                ref={(ref) => (this.userCommentTextInput = ref)}
                                style={{
                                    fontSize: 16,

                                    lineHeight: 23,
                                    marginBottom:15
                                }}
                                multiline
                                onChangeText={(e) =>
                                    this.setState({ commentText: e })
                                }

                                value={this.state.commentText}
                                placeholder={"ENTER YOUR COMMENT"}
                                autoFocus={true}
                            />
                        </KeyboardAvoidingView>
                    </View>
                </View>
                </View>
        );
    }
}
