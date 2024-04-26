<template>
    <q-dialog>
        <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
            <div class="text-h6">Medium</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
            Click/Tap on the backdrop.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
        </q-card>
    </q-dialog>
</template>
