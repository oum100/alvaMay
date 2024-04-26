<template>
    <q-layout view="hHh lpR fFf" container style="height: 800px" >
        <KioskHeader/>
            <q-page-container>
                <q-page>
                    <slot />
                </q-page>
            </q-page-container>
     
    </q-layout>
</template>