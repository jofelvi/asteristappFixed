

import React, { useEffect } from 'react';
import SideMenu from 'react-native-side-menu'


function  SlideBar(){

    const [isOpen, setIsOpen] = useState(false);

    const updateMenuState = () => {
        setIsOpen(!isOpen);
    }

    return(
        <SafeAreaView>
        <SideMenu
          menu={menu}
          isOpen={isOpen}
          onChange={isOpen => updateMenuState(isOpen)}
        >
          <View style={styles.container}>
            <Text style={styles.welcome}>
              Welcome to React Native!
            </Text>
            <Text style={styles.instructions}>
              To get started, edit index.ios.js
            </Text>
            <Text style={styles.instructions}>
              Press Cmd+R to reload,{'\n'}
              Cmd+Control+Z for dev menu
            </Text>
            <Text style={styles.instructions}>
              Current selected menu item is: {this.state.selectedItem}
            </Text>
          </View>
          <TouchableOpacity
            onPress={this.toggle}
            style={styles.button}
          >
            <Image
              source={image}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
        </SideMenu>
      </SafeAreaView>
    )

}

export default SlideBar;