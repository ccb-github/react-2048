import React,{ useState, useEffect } from "react";
import { Dialog, Paragraph, Button, Portal } from "react-native-paper"
import { View, Text } from 'react-native'

export default function ConfirmDialog(props: ConfirmDialogProps) {
  const [visible, setVisible] = useState(true);
  
  
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    console.log("The confirm dialog");
  });

  return (
    <View>
      <Portal>
        <Dialog visible={visible} dismissable={false}>
          <Dialog.Title>Alert</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              {props.content
                ? props.content
                : "The props.content will display here"
              }
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
                props.dialogAction();
              }}
            >
              <Text>Yes</Text>
            </Button>
            <Button onPress={hideDialog}>
              <Text>No</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}


