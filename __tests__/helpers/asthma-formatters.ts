import { formatInnerSpan } from '../../src/components/asthma/helpers/asthma-formatters';

describe('Asthma Formatters', () => {
    it('Should format placeholder text within other text.', async () => {
            const str = "My test |||placeholder text||| string.";
            const element = formatInnerSpan(str, "testClass");
            const innerSpan = element.props.children[1];

            expect(element.props.children.length).toEqual(3);
            expect(element.props.children[0]).toEqual("My test ");
            expect(element.props.children[2]).toEqual(" string.");
            expect(innerSpan.props.className).toEqual("testClass");
            expect(innerSpan.props.children).toEqual("placeholder text");
        });

        it('Should format placeholder text before other text.', async () => {
            const str = "|||placeholder text||| string.";
            const element = formatInnerSpan(str, "testClass");
            const innerSpan = element.props.children[1];

            expect(element.props.children.length).toEqual(3);
            expect(element.props.children[0]).toEqual("");
            expect(element.props.children[2]).toEqual(" string.");
            expect(innerSpan.props.className).toEqual("testClass");
            expect(innerSpan.props.children).toEqual("placeholder text");
        });

        it('Should format placeholder text after other text.', async () => {
            const str = "My test |||placeholder text|||";
            const element = formatInnerSpan(str, "testClass");
            const innerSpan = element.props.children[1];

            expect(element.props.children.length).toEqual(3);
            expect(element.props.children[0]).toEqual("My test ");
            expect(element.props.children[2]).toEqual("");
            expect(innerSpan.props.className).toEqual("testClass");
            expect(innerSpan.props.children).toEqual("placeholder text");
        });

        it('Should format only placeholder text.', async () => {
            const str = "|||placeholder text|||";
            const element = formatInnerSpan(str, "testClass");
            const innerSpan = element.props.children[1];

            expect(element.props.children.length).toEqual(3);
            expect(element.props.children[0]).toEqual("");
            expect(element.props.children[2]).toEqual("");
            expect(innerSpan.props.className).toEqual("testClass");
            expect(innerSpan.props.children).toEqual("placeholder text");
        });

        it('Should format text with no placeholder.', async () => {
            const str = "My test string.";
            const element = formatInnerSpan(str, "testClass");

            expect(element.props.children).toEqual("My test string.");
        });
    });


