import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  FlatList,
  Image,
  SafeAreaView,
  Dimensions,
  Animated,
  Button,
  Modal,
  Alert,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Sound from 'react-native-sound';

const testArrayDefault = ['red', 'green', 'yellow', 'purple'];

const data = [
  {
    image: 'https://i1.sndcdn.com/artworks-000678448540-1ppdtr-t500x500.jpg',
    songUrl: 'hevesimyok.mp3',
    songName: 'Hevesim Yok',
    singer: 'Reynmen',
    isPlaying: false,
    isLiked: true,
    color: '#586ba4',
  },
  {
    image: 'https://i.scdn.co/image/ab67616d0000b273d0728398824b5bcd5bf5c1e6',
    songName: 'My Life Is Going On',
    songUrl: 'mylifeisgoingon.mp3',
    singer: 'Cecilia Krull',
    isPlaying: false,
    isLiked: true,
    color: '#474787',
  },
  {
    image: 'https://i.scdn.co/image/6675c814b62f0a20af8d55692b7eb00ec3e310dd',
    songName: 'Beni Kendinden Kurtar',
    songUrl: 'benikendindenkurtar.mp3',
    singer: 'Perdenin Ardındakiler',
    isPlaying: false,
    isLiked: true,
    color: '#FEA47F',
  },
  {
    image: 'https://i.scdn.co/image/ab67616d0000b273b60aca0b8010a76b2eb84ff9',
    songName: 'Smack That',
    songUrl: 'smackthat.mp3',
    singer: 'Akon - Eminem',
    isPlaying: false,
    isLiked: false,
    color: '#B33771',
  },
];
let sound: Sound = new Sound('smackthat.mp3', Sound.MAIN_BUNDLE, () => {});
const LikedList = () => {
  const [searchText, setSearchText] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [songs, setSongs] = useState(data);
  const [playingIndex, setPlayingIndex] = useState(0);
  const [playingSong, setPlayingSong] = useState<any>(data[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [testArray, setTestArray] = useState(testArrayDefault);

  let yValue = useRef(new Animated.Value(Dimensions.get('screen').height))
    .current;
  let val1 = useRef(new Animated.Value(30)).current;
  let val2 = useRef(new Animated.Value(15)).current;
  let val3 = useRef(new Animated.Value(0)).current;

  const green = '#1DB954';

  function playSound(item: any, index: number) {
    if (sound.isPlaying() === false) {
      sound = new Sound(item.songUrl, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.warn('failed to load the sound', error);
          return;
        }
        setPlayingSong(item);
        setPlayingIndex(index);
        playAnimation();
        sound.play();
        songs[index].isPlaying = !sound.isPlaying();
        setSongs([...songs]);
      });
    } else {
      if (item.isPlaying === true) {
        sound.stop();
        songs[index].isPlaying = false;
        setSongs([...songs]);
      } else {
        sound.stop();
        songs.forEach(i => {
          i.isPlaying = false;
        });

        sound = new Sound(item.songUrl, Sound.MAIN_BUNDLE, error => {
          if (error) {
            console.warn('failed to load the sound', error);
            return;
          }
          setPlayingSong(item);
          setPlayingIndex(index);
          playAnimation();
          sound.play();
          songs[index].isPlaying = !sound.isPlaying();
          setSongs([...songs]);
        });
      }
    }
  }

  function playMixed(index: number) {
    let url = songs[index].songUrl;
    if (sound.isPlaying()) {
      sound.stop();
      songs[playingIndex].isPlaying = false;
      setSongs([...songs]);
    }
    sound = new Sound(url, Sound.MAIN_BUNDLE, () => {
      songs[index].isPlaying = true;
      setSongs([...songs]);
      setPlayingIndex(index);
      setPlayingSong(songs[index]);
      playAnimation();
      sound.play();
    });
  }

  function openPlayerUI() {
    Animated.timing(yValue, {
      toValue: Dimensions.get('screen').height * 0.3,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }

  function closePlayerUI() {
    Animated.timing(yValue, {
      toValue: Dimensions.get('screen').height,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }

  function playAnimation() {
    let anim11 = Animated.timing(val1, {
      useNativeDriver: false,
      toValue: 0,
      duration: 700,
    });
    let anim12 = Animated.timing(val1, {
      useNativeDriver: false,
      toValue: 30,
      duration: 700,
    });
    let anim1Sequence = Animated.sequence([anim11, anim12]);

    let anim21 = Animated.timing(val2, {
      useNativeDriver: false,
      toValue: 30,
      duration: 700,
    });
    let anim22 = Animated.timing(val2, {
      useNativeDriver: false,
      toValue: 15,
      duration: 700,
    });
    let anim2Sequence = Animated.sequence([anim21, anim22]);

    let anim31 = Animated.timing(val3, {
      useNativeDriver: false,
      toValue: 30,
      duration: 700,
    });
    let anim32 = Animated.timing(val3, {
      useNativeDriver: false,
      toValue: 0,
      duration: 700,
    });
    let anim3Sequence = Animated.sequence([anim31, anim32]);

    let parallel = Animated.parallel([
      anim1Sequence,
      anim2Sequence,
      anim3Sequence,
    ]);

    Animated.loop(parallel).start();
  }

  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={['#483A62', '#3b5998', '#191414']}
        style={{
          ...styles.linearGradient,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginTop: 50,
            justifyContent: 'space-evenly',
          }}>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0, 0.15)',
              width: '70%',
              height: 45,
              borderRadius: 6,
            }}>
            <TextInput
              keyboardAppearance={'dark'}
              returnKeyType={'search'}
              placeholder={'Search'}
              placeholderTextColor={'white'}
              selectionColor={'white'}
              autoCapitalize={'none'}
              autoCorrect={false}
              value={searchText}
              onChangeText={e => setSearchText(e)}
              style={{flex: 1, marginLeft: 20, color: 'white'}}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 45,
              width: '20%',
              borderRadius: 7,
              backgroundColor: 'rgba(0,0,0, 0.15)',
            }}>
            <Text style={{color: 'white'}}>Filter</Text>
          </TouchableOpacity>
        </View>

        <Text style={{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
          Liked Songs
        </Text>

        <TouchableOpacity
          onPress={() => {
            const num = Number((Math.random() * (data.length - 1)).toFixed(0));
            playMixed(num);
          }}
          activeOpacity={0.8}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '65%',
            height: 60,
            borderRadius: 30,
            backgroundColor: '#1DB954',
          }}>
          <Text style={{color: 'white', fontSize: 17, fontWeight: 'bold'}}>
            Shuffle Play
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '35%',
            height: 35,
            borderRadius: 30,
            backgroundColor: '#191414',
            borderColor: 'grey',
            borderWidth: 1,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 15}}>
            Add Songs
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{color: 'white', fontSize: 20}}>Download</Text>
          <Switch
            ios_backgroundColor="#3e3e3e"
            value={isEnabled}
            onValueChange={value => setIsEnabled(value)}
          />
        </View>
      </LinearGradient>

      <View style={{flex: 1, backgroundColor: '#191414'}}>
        <FlatList
          data={data}
          keyExtractor={item => item.singer}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: 70,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      source={{uri: item.image}}
                      style={{width: 45, height: 45, borderRadius: 3}}
                    />

                    {item.isPlaying ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          height: 50,
                          position: 'absolute',
                          paddingVertical: 10,
                        }}>
                        <Animated.View
                          style={{
                            width: 3,
                            marginTop: val1,
                            backgroundColor: green,
                          }}></Animated.View>
                        <Animated.View
                          style={{
                            width: 3,
                            marginTop: val2,
                            backgroundColor: green,
                            marginHorizontal: 5,
                          }}></Animated.View>
                        <Animated.View
                          style={{
                            width: 3,
                            marginTop: val3,
                            backgroundColor: green,
                          }}></Animated.View>
                      </View>
                    ) : null}
                  </View>

                  <View style={{marginLeft: 15}}>
                    <Text
                      style={{
                        color: item.isPlaying ? green : 'white',
                        fontSize: 15,
                        marginBottom: 5,
                      }}>
                      {item.songName}
                    </Text>
                    <Text
                      style={{color: 'grey', fontWeight: 'bold', fontSize: 15}}>
                      {item.singer}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: 80,
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => playSound(item, index)}>
                    <MaterialCommunityIcons
                      color={green}
                      name={item.isPlaying ? 'stop' : 'play'}
                      size={28}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{marginRight: 10}}>
                    <MaterialCommunityIcons
                      color={'grey'}
                      name="dots-horizontal"
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
        <SafeAreaView>
          <View
            style={{
              height: 70,
              backgroundColor: 'rgba(80,80,80,1)',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{flex: 1}}
              activeOpacity={0.8}
              onPress={() => openPlayerUI()}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  resizeMode={'stretch'}
                  source={{uri: playingSong.image}}
                  style={{width: 70, height: 70}}
                />

                <View
                  style={{
                    justifyContent: 'space-evenly',
                    marginLeft: 10,
                    flex: 1,
                  }}>
                  <Text style={{color: 'white'}}>{playingSong.songName}</Text>
                  <Text style={{color: 'rgba(255,255,255,0.7)'}}>
                    {playingSong.singer}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{justifyContent: 'center', marginRight: 30}}
              activeOpacity={0.7}
              onPress={() => playSound(playingSong, playingIndex)}>
              <MaterialCommunityIcons
                color={green}
                name={playingSong.isPlaying ? 'stop' : 'play'}
                size={35}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: yValue,
          left: 0,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <SafeAreaView
          style={{
            backgroundColor: playingSong.color,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <TouchableOpacity activeOpacity={0.7} onPress={closePlayerUI}>
              <MaterialCommunityIcons
                color={'white'}
                name={'chevron-down'}
                size={35}
              />
            </TouchableOpacity>

            <Text style={{color: 'white'}}>Liked Songs</Text>

            <MaterialCommunityIcons
              color={'white'}
              name={'dots-horizontal'}
              size={25}
            />
          </View>

          <Image
            source={{uri: playingSong.image}}
            style={{
              width: '80%',
              height: '40%',
              alignSelf: 'center',
              borderRadius: 5,
              marginTop: '10%',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 30,
              marginVertical: 20,
            }}>
            <View>
              <Text style={{color: 'white'}}>{playingSong.songName}</Text>
              <Text style={{color: 'white'}}>{playingSong.singer}</Text>
            </View>
            <MaterialCommunityIcons name="heart" size={25} color={green} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                let newIndex = 0;
                if (playingIndex - 1 < 0) {
                  newIndex = songs.length - 1;
                } else {
                  newIndex = playingIndex - 1;
                }

                playSound(data[newIndex], newIndex);
              }}
              activeOpacity={0.8}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <MaterialCommunityIcons
                color={'white'}
                name={'skip-previous'}
                size={30}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => playSound(playingSong, playingIndex)}
              activeOpacity={0.8}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                borderWidth: 2,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'white',
              }}>
              <MaterialCommunityIcons
                color={'white'}
                name={playingSong.isPlaying ? 'stop' : 'play'}
                size={30}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                let newIndex = 0;
                if (playingIndex + 1 === songs.length) {
                  newIndex = 0;
                } else {
                  newIndex = playingIndex + 1;
                }

                playSound(data[newIndex], newIndex);
              }}
              activeOpacity={0.8}
              style={{justifyContent: 'center', alignItems: 'center'}}>
              <MaterialCommunityIcons
                color={'white'}
                name={'skip-next'}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

export default LikedList;

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});
