import React from 'react';
import {
  Text, Image, View, style
} from 'react-native';
import Tts from 'react-native-tts';

const Result = () => {
    const s1 = 'We are in the Endgame Now !!';
    const s2 = 'Whatever It takes!!';
    const s3 = "If we can't protect the Earth, you can be damned well sure we'll avenge it!";
    // Tts.setDefaultVoice('com.apple.ttsbundle.Thomas-compact');
    // Tts.voices().then(voices => console.log(voices));
    Tts.speak(s1);
    Tts.speak(s2);
    Tts.speak(s3);
  return (
    <View>
        <Image style={{alignItems: 'center', height:400, width:400}}
            source ={{
                uri :'https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_mas_mob_01.jpg',
            }}
        />
        <Text style ={{color:'white', fontSize: 28, alignItems:'center'}}>
            {"\n"} We are in the Endgame Now !! {"\n"}
            {"\n"} Whatever It takes!! {"\n"}
            {"\n"} If we can't protect the Earth, you can be damned well sure we'll avenge it!{"\n"}
        </Text>
    </View>
    
  );
};

export default Result;