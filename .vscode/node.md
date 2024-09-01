#
```jsx
<Text
          style={[
            styles.gameTitleText,
            {
                // This will let 
              padding: tempFunction(5),
              backgroundColor: "blue",
              fontSize: tempFunction(20),
            },
          ]}
        >

 <View
        style={[
          // divStyles.buttonBox,
          divStyles.colDiv,
          {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        {/* <View
          style={{
            flex: 1,
            height: "100%",
            alignItems: "center",
            padding: tempFunction(5),
            paddingTop: 20,
            backgroundColor: "red",
            justifyContent: "center",
          }}
        > */}
        {/* <Text
          style={[
            styles.gameTitleText,
            {
              padding: tempFunction(5),
              backgroundColor: "blue",
              fontSize: tempFunction(20),
            },
          ]}
        >
          2048
        </Text> */}
        {/* <View
          style={[
            styles.gameTitleText,
            {
              padding: tempFunction(5),
              backgroundColor: "blue",
              height: 30,
              // fontSize: tempFunction(20),
            },
          ]}
        >
        </View> */}
        {/* </View> */}
        <View
          style={{
            flex: 1,
            height: "100%",
            alignItems: "center",
            padding: tempFunction(5),
            backgroundColor: "red",
            justifyContent: "center",
          }}
        >
          {/* TODO should we scale the small size */}
          <Button
            style={{
              backgroundColor: "#faffff",
              borderWidth: 2,
              borderColor: "#FFF",

              height: "100%",
              width: "100%",
              minHeight: tempFunction(40),
            }}
            onPress={() => {
              setDialogState("saveGame")
            }}
          >
            Save Game
          </Button>
        </View>
      </View>
```