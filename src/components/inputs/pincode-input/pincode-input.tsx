import { Heading, HStack, PinInput, PinInputField, Text, VStack } from '@chakra-ui/react';
import { StatusCodes } from 'http-status-codes';
import { useEffect, useRef, useState } from 'react';

import { useVerifyOTPMutation } from '~/query/services/auth';
import { useAppSelector } from '~/store/hooks';
import { getUserEmail } from '~/store/user/selectors';
import { ApiQueryError } from '~/types/api-message.type';
import { TestIdName } from '~/utils/constant';

export const PinCodeInput = ({ onSuccess }: { onSuccess: () => void }) => {
    const [pin, setPin] = useState('');
    const [isInvalid, setIsInvalid] = useState(false);
    const pinInputRef = useRef<HTMLInputElement>(null);
    const email = useAppSelector(getUserEmail) ?? '';
    const [verifyOTP] = useVerifyOTPMutation();
    const length = 6;
    const PIN_TEXT = {
        body: ['Мы отправили вам на e-mail', `${email}`, 'шестизначный код. Введите его ниже.'],
        header: 'Неверный код',
    };

    const handlePinChange = (value: string) => {
        setIsInvalid(false);
        setPin(value);
    };

    const handleSubmit = async () => {
        setIsInvalid(false);
        await verifyOTP({ otpToken: pin, email })
            .unwrap()
            .then(() => {
                onSuccess();
            })
            .catch(async (error) => {
                const { status } = error as ApiQueryError;
                setPin('');
                if (status === StatusCodes.FORBIDDEN) {
                    setIsInvalid(true);
                }
            });
    };

    useEffect(() => {
        pinInputRef.current?.focus();
    }, []);

    return (
        <VStack>
            {isInvalid && (
                <Heading as='h1' fontSize='2xl' lineHeight={8} textAlign='center' mb={0} w='90%'>
                    {PIN_TEXT.header}
                </Heading>
            )}
            <VStack gap={0}>
                {PIN_TEXT.body.map((text, index) => (
                    <Text
                        key={index}
                        color={index === 1 ? 'blackAlpha.900' : 'blackAlpha.700'}
                        textAlign='center'
                        fontSize='md'
                        lineHeight={6}
                        fontWeight={index === 1 ? 'bold' : 'normal'}
                    >
                        {text}
                    </Text>
                ))}{' '}
            </VStack>
            <HStack spacing={3} mt={4}>
                <PinInput
                    otp
                    type='number'
                    isInvalid={isInvalid}
                    value={pin}
                    onChange={handlePinChange}
                    onComplete={handleSubmit}
                    manageFocus
                    size='md'
                >
                    {[...Array(length)].map((_, i) => (
                        <PinInputField
                            _placeholder={{ color: 'lime.800' }}
                            color='lime.800'
                            key={i}
                            ref={i === 0 ? pinInputRef : null}
                            data-test-id={`${TestIdName.InputVerificationCode}-${i + 1}`}
                        />
                    ))}
                </PinInput>
            </HStack>
        </VStack>
    );
};
