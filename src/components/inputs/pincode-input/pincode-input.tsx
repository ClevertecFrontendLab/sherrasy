import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

export const PinCodeInput = ({ onSuccess }: { onSuccess: () => void }) => {
    const [pin, setPin] = useState('');
    const pinInputRef = useRef<HTMLInputElement>(null);
    const isInvalid = false;
    const length = 6;
    useEffect(() => {
        if (pin.length === length) {
            console.log(pin);
            onSuccess();
        }
    }, [pin, length, onSuccess]);

    useEffect(() => {
        pinInputRef.current?.focus();
    }, []);

    return (
        <HStack spacing={3} mt={4}>
            <PinInput otp type='number' value={pin} onChange={setPin} manageFocus size='md'>
                {[...Array(length)].map((_, i) => (
                    <PinInputField
                        _placeholder={{ color: 'lime.800' }}
                        color='lime.800'
                        key={i}
                        ref={i === 0 ? pinInputRef : null}
                        borderColor={isInvalid ? 'red.500' : undefined}
                        _focus={{
                            borderColor: isInvalid ? 'red.500' : 'lime.500',
                            boxShadow: isInvalid ? '0 0 0 1px red' : undefined,
                        }}
                    />
                ))}
            </PinInput>
        </HStack>
    );
};
