import React from 'react'
import { Layout, NavigationBar, StatusBarBackground, ViewHeader } from "../.."
import { ColorDefinition } from '../../../helpers/colors'

export interface BlankViewProps {
    children?: React.ReactNode
    title?: string
    subtitle?: string
    showCloseButton?: boolean
    showBackButton?: boolean
    colorScheme?: "auto" | "light" | "dark"
    primaryColor?: ColorDefinition
}

export default function (props: BlankViewProps) {
    return (
        <Layout colorScheme={props.colorScheme ?? "auto"} primaryColor={props.primaryColor}>
            {(props.showBackButton || props.showCloseButton) &&
                <NavigationBar title={props.title}
                    showBackButton={props.showBackButton}
                    showCloseButton={props.showCloseButton} subtitle={props.subtitle}></NavigationBar>
            }
            {!(props.showBackButton || props.showCloseButton) &&
                <>
                    <StatusBarBackground />
                    <ViewHeader title={props.title} subtitle={props.subtitle} />
                </>
            }
            {props.children}
        </Layout>
    )
}