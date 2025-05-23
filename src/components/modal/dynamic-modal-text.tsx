import { Text } from '@chakra-ui/react';

type DynamicModalTextProps = Partial<{
    textData: string[];
    highlightIndex: number;
    highlightCondition: boolean;
    customText: string;
}>;

export const DynamicModalText = ({
    textData,
    highlightIndex = -1,
    highlightCondition = true,
    customText,
}: DynamicModalTextProps) => {
    if (!textData || !Array.isArray(textData)) {
        return null;
    }

    return (
        <>
            {textData.map((text, index) => {
                const isHighlighted = index === highlightIndex && highlightCondition;
                return (
                    <Text
                        key={index}
                        color={isHighlighted ? 'blackAlpha.900' : 'blackAlpha.700'}
                        textAlign='center'
                        fontSize='md'
                        lineHeight={6}
                        fontWeight={isHighlighted ? 'bold' : 'normal'}
                    >
                        {isHighlighted ? customText : text}
                    </Text>
                );
            })}
        </>
    );
};
