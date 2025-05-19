import { HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

import { useVerifyOTPMutation } from '~/query/services/auth';
import { useAppSelector } from '~/store/hooks';
import { getUserEmail } from '~/store/user/selectors';
import { TestIdName } from '~/utils/constant';

export const PinCodeInput = ({ onSuccess }: { onSuccess: () => void }) => {
    const [pin, setPin] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const pinInputRef = useRef<HTMLInputElement>(null);
    const email = useAppSelector(getUserEmail) ?? '';
    const [verifyOTP] = useVerifyOTPMutation();
    const length = 6;
    const handleSubmit = async () => {
        await verifyOTP({ otpToken: pin, email })
            .unwrap()
            .then(() => {
                onSuccess();
            })
            .catch(async () => {
                setPin('');
                setIsInvalid(true);
            });
    };
    useEffect(() => {
        if (pin.length === length) {
            handleSubmit();
        }
    }, [pin, length, handleSubmit]);

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
                        }}
                        data-test-id={`${TestIdName.InputVerificationCode}-${i + 1}`}
                    />
                ))}
            </PinInput>
        </HStack>
    );
};
