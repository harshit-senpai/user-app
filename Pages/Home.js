import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Auidance from './Auidancestream';

const Home = ({navigation}) => {
  const [post, setPost] = useState('');
  const [news, setNews] = useState(true);
  const [newsdata, setNewsdata] = useState('');
  const [search, setSearch] = useState('flood');
  const [load, setLoad] = useState(false);
  const [load1, setLoad1] = useState(true);

  useEffect(() => {
    getpost();
    notify();
  }, []);

  const getpost = async () => {
    let data = await fetch(`https://noida-server.vercel.app/post/postget`);
    data = await data.json();
    if (data) {
      setPost(data);
      setLoad1(false);
      console.log(data[0]);
    }
  };

  const getnews = async () => {
    setNews(false);
    setLoad(true);
    let data = await fetch(
      `https://newsapi.org/v2/everything?q=${search}&apiKey=fb96122d83d741b0871e7148f4c049bb`,
    );
    data = await data.json();
    if (data) {
      setNewsdata(data.articles);
      setLoad(false);
    } else {
      setLoad(true);
    }
  };
  const notify = async () => {
    let data = await fetch(`https://noida-server.vercel.app/post/checkpost`);
    data = await data.json();
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View>
          <View style={{flexDirection: 'row', marginTop: 10, padding: 15}}>
            <View style={{marginTop: 10}}>
              <Image
                style={{height: 25}}
                source={require('../Images/map.png')}></Image>
            </View>
            <View style={{marginLeft: 10}}>
              <Text style={{fontWeight: '500'}}>Your Location</Text>
              <Text style={{color: 'black', fontWeight: '800'}}>DSCE</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: '94%',
              height: 150,
              alignSelf: 'center',
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate('auidance')}>
            {/* <Stream></Stream> */}
            {/* <Auidance></Auidance> */}

            <ImageBackground
              style={{width: '100%', height: '100%'}}
              source={require('../Images/hombac.png')}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <View>
                  <Text style={{fontSize: 50, color: '#fff'}}>
                    30 <Text style={{fontSize: 20}}>c</Text>
                  </Text>
                  <Text
                    style={{fontSize: 20, color: '#fff', fontWeight: '600'}}>
                    Partialy Cloud
                  </Text>
                </View>
                <View style={{marginTop: 20}}>
                  <Image source={require('../Images/cloud.png')}></Image>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          {news ? (
            <View
              style={{
                backgroundColor: 'rgb(220,220,220)',
                height: '100%',
                width: '99%',
                alignSelf: 'center',
                marginTop: 10,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}>
              <ScrollView>
                {/* <Text style={{ padding: 10, fontSize: 20, fontWeight: "500" }}>Recent news</Text> */}
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => setNews(true)}>
                    <Text
                      style={{padding: 10, fontSize: 20, fontWeight: '500'}}>
                      Recent Post /
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => getnews()}>
                    <Text
                      style={{marginTop: 10, fontSize: 20, fontWeight: '500'}}>
                      Recent News
                    </Text>
                  </TouchableOpacity>
                </View>
                {load1 ? (
                  <ActivityIndicator size={44}></ActivityIndicator>
                ) : (
                  <View style={{marginBottom: 320}}>
                    {post && post.length > 0 ? (
                      post.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() =>
                            navigation.navigate('singlenews', item._id)
                          }>
                          <View
                            style={{
                              height: 250,
                              width: '90%',
                              alignSelf: 'center',
                            }}>
                            <View>
                              <Image
                                style={{
                                  height: 170,
                                  width: '100%',
                                  borderRadius: 7,
                                }}
                                source={{uri: `${item.images}`}}></Image>
                            </View>
                            <Text
                              style={{
                                fontSize: 20,
                                color: '#000',
                                fontWeight: '600',
                              }}>
                              {item.heading}
                            </Text>
                            {/* Magnitude 4.6 earthquake */}
                            <Text>{item.subheading}</Text>
                            {/* Affected countries: India, Myanmar (Burma), and China Arunachal Pradesh · 5:18 am */}
                          </View>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <Text>No post</Text>
                    )}
                  </View>
                )}
              </ScrollView>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: 'rgb(220,220,220)',
                height: '100%',
                width: '99%',
                alignSelf: 'center',
                marginTop: 10,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}>
              {load ? (
                <ActivityIndicator
                  style={{marginTop: 200}}
                  size={44}></ActivityIndicator>
              ) : (
                <View>
                  <ScrollView>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity onPress={() => setNews(true)}>
                        <Text
                          style={{
                            padding: 10,
                            fontSize: 20,
                            fontWeight: '500',
                          }}>
                          Recent Post /
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setNews(false)}>
                        <Text
                          style={{
                            marginTop: 10,
                            fontSize: 20,
                            fontWeight: '500',
                          }}>
                          Recent News
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        width: 320,
                        backgroundColor: '#fff',
                        marginTop: 5,
                        alignSelf: 'center',
                        borderRadius: 50,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                      }}>
                      <TouchableOpacity onPress={() => getnews()}>
                        <Icon name="search" size={44}></Icon>
                      </TouchableOpacity>
                      <TextInput
                        value={search}
                        onChangeText={text => setSearch(text)}
                        placeholder="Search By Type"></TextInput>
                      <Image source={require('../Images/input.png')}></Image>
                    </View>

                    <View style={{marginBottom: 320, marginTop: 30}}>
                      {newsdata && newsdata.length > 0 ? (
                        newsdata.map((item, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() =>
                              navigation.navigate('singleapinews', item.url)
                            }>
                            <View
                              style={{
                                height: 350,
                                width: '90%',
                                alignSelf: 'center',
                              }}>
                              <View>
                                <Image
                                  style={{
                                    height: 170,
                                    width: '100%',
                                    borderRadius: 7,
                                  }}
                                  source={{uri: `${item.urlToImage}`}}></Image>
                              </View>
                              <Text
                                style={{
                                  fontSize: 20,
                                  color: '#000',
                                  fontWeight: '600',
                                }}>
                                {item.title}
                              </Text>
                              {/* Magnitude 4.6 earthquake */}
                              <Text>{item.content}</Text>
                              {/* Affected countries: India, Myanmar (Burma), and China Arunachal Pradesh · 5:18 am */}
                            </View>
                          </TouchableOpacity>
                        ))
                      ) : (
                        <Text>No news</Text>
                      )}
                    </View>
                  </ScrollView>
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
