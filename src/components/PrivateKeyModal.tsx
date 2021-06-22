import React, {useRef} from 'react';
import './PrivateKeyModal.css';

type Props = {
    recordPrivateKey: (chars: string) => void;
  };

const PrivateKeyModal = ({recordPrivateKey}: Props) => {

  const textInput = useRef(null);

  const recordKey = () => {
    const currentInput: any = textInput?.current ?  textInput?.current : null;
    if (currentInput !== null) {
      const value = currentInput.value;
      recordPrivateKey(value);
    }
  }

  return (
    <div className="key_modal_container">
        <div className="key_modal">
            <span>Enter Private Key:</span>
            <br/>
            <input type="text" ref={textInput}/>
            <button onClick={() => {recordKey()}}>Send</button>
        </div>
    </div>
  );
}

export default PrivateKeyModal;