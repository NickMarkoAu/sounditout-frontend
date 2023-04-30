import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector, useTheme} from "../../state/hooks";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faSearch, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {faClock} from "@fortawesome/free-regular-svg-icons";
import {SearchRequest, SearchType} from "./search.model";
import {getRecentSearchesAction, searchAction, updatePost} from "../../state/song-suggestion.slice";
import {selectCurrentUser, selectRecentSearches, selectSearchResults} from "../../state/song-suggestion.selector";
import ImagePosts from "../post/postviews/ImagePosts";
import SongPosts from "../post/postviews/SongPosts";
import ProfileList from "../profile/list/ProfileList";

const SearchComponent = ({navigation}) => {
  const {colours, fonts} = useTheme;
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState(SearchType.POST);
  const recentSearches = useAppSelector(selectRecentSearches);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const searchResults = useAppSelector(selectSearchResults);

  const styles = StyleSheet.create({
    searchContainer: {
      flex: 1,
      marginTop: 100,
      height: undefined,
      alignSelf: 'stretch',
      marginBottom: 40,
      zIndex: 1
    },
    searchBarContainer: {
      margin: 8,
      justifyContent: "center",
      flexDirection: "row",
      padding: 3,
      alignItems: 'center', //Centered vertically
      backgroundColor: colours.secondary,
      borderRadius: 15
    },
    searchBar: {
      height: 35,
      width: '90%',
      color: colours.grey,
      margin: 5,
      borderWidth: 0,
      padding: 10,
    },
    searchIcon: {
      marginRight: 10
    },
    searchTabButtons: {
      width: "90%",
      marginTop: 8,
      marginRight: 8,
      marginLeft: 8,
      flexDirection: "row",
      justifyContent: 'space-around',
    },
    searchTabButton: {
      alignSelf: 'stretch',
      flexGrow: 1,
      margin: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    active: {
      borderBottomWidth: 1,
      borderBottomColor: colours.primary
    },
    tabText: {
      color: colours.grey,
      marginBottom: 8
    },
    searchResultsContainer: {
      paddingLeft: 16,
      paddingRight: 16,
    },
    recentHeader: {
      color: colours.text_primary,
      fontFamily: fonts.primary,
      fontSize: 16
    },
    recentContainer: {},
    searchResults: {},
    recentSearchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'center',
      padding: 6
    },
    recentText: {
      color: colours.text_primary,
    },
    recentIcon: {
      marginRight: 6
    }
  });

  const changeTab = (tab: SearchType) => () => {
    setActiveTab(tab);
  }

  useEffect(() => {
    dispatch(getRecentSearchesAction({user}));
  }, []);

  useEffect(() => {
    // debounce search until finished typing
    const timeoutId = setTimeout(() => {
      if (query.length > 0) {
        const searchRequest: SearchRequest = {query, type: activeTab, page: 0};
        console.log("Search request: ", searchRequest);
        dispatch(searchAction({searchRequest}));
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, activeTab]);

  const setSearch = (search) => {
    setQuery(search.query);
    setActiveTab(search.type);
  }

  const clearQuery = () => {
    setQuery('');
  }

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#7f7f7f"
          value={query}
          onChangeText={setQuery}
        />
        {query.length == 0 ?
          <FontAwesomeIcon style={styles.searchIcon} icon={faSearch} size={20} color={colours.grey}/>
          :
          <TouchableOpacity onPress={clearQuery}>
            <FontAwesomeIcon style={styles.searchIcon} icon={faTimesCircle} size={20} color={colours.grey}/>
          </TouchableOpacity>}
      </View>
      <View style={styles.searchTabButtons}>
        <TouchableOpacity style={[styles.searchTabButton, activeTab === SearchType.POST && styles.active]}
                          onPress={changeTab(SearchType.POST)}>
          <Text style={styles.tabText}>
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.searchTabButton, activeTab === SearchType.USER && styles.active]}
                          onPress={changeTab(SearchType.USER)}>
          <Text style={styles.tabText}>
            People
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.searchTabButton, activeTab === SearchType.MUSIC && styles.active]}
                          onPress={changeTab(SearchType.MUSIC)}>
          <Text style={styles.tabText}>
            Music
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchResultsContainer}>
        {query.length == 0 ?
          <View style={styles.recentContainer}>
            <Text style={styles.recentHeader}>
              Recents
            </Text>
            <View style={styles.searchResults}>
              {recentSearches?.map((search, index) => {
                return (
                  <TouchableOpacity style={styles.recentSearchContainer} key={index} onPress={() => setSearch(search)}>
                    <FontAwesomeIcon style={styles.recentIcon} icon={faClock} size={20} color={colours.grey}/>
                    <Text style={styles.recentText}>
                      {search.query}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
          :
          <View>
            {activeTab === SearchType.POST ?
              <ImagePosts posts={searchResults?.results?.content}/>
              : activeTab === SearchType.USER ?
                <ProfileList profiles={searchResults?.results?.content} navigation={navigation}/>
                : activeTab === SearchType.MUSIC ?
                  <SongPosts posts={searchResults?.results?.content}/>
                  : null}
          </View>
        }
      </View>
    </View>
  );
}

export default SearchComponent;