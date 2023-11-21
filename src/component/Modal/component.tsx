import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

type ModalProps = {
  modalVisible: boolean;
  text?: string;
  children?: any;
};

export default function CustomModal({ modalVisible, children }: ModalProps) {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>{children}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    height: '20%',
    margin: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 25,
    alignItems: 'center',
    elevation: 5,
    borderWidth: 1,
  },
});
