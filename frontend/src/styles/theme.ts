import { Button, createTheme } from '@mantine/core'

export const theme = createTheme({
    fontFamily: 'Montserrat',
    components: {
        Button: Button.extend({
            defaultProps: {
                radius: '10px',
            },
        }),
    },
    colors: {
        orange: [
            '#ffb6a1',
            '#ffa78e',
            '#ff997b',
            '#ff8a69',
            '#ff7c56',
            '#ff6d43',
            '#e6623c',
            '#cc5736',
            '#b34c2f',
            '#994128',
            '#803722',
        ],
        'eviden-dark': [
            '#80969e',
            '#66818a',
            '#4d6c77',
            '#335763',
            '#1a4250',
            '#002d3c',
            '#002936',
            '#002430',
            '#00202a',
            '#001b24',
            '#00171e',
        ],
    },
    primaryColor: 'orange',
})
