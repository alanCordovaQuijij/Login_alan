// ConfirmModal.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

interface ConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5 }}>
          <Text>¿Estás seguro de que quieres eliminar este favorito?</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
            <TouchableOpacity onPress={onConfirm}>
              <Text>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;
