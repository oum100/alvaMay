<template>
        <div class="q-mx-sm">
            {{ data?.user?.name}}
            <q-tooltip>User signed in</q-tooltip>
        </div>
        <q-avatar>
            <!-- <img src="/images/users/Alva-Hi.png"> -->
            <img v-if="data?.user?.image == (null || undefined) " src=/images/users/nobody.png>
            <img v-else :src=data?.user?.image!>
            <q-tooltip>Profile</q-tooltip>

            <q-menu style="width:300px">
                <div class="row no-wrap q-pa-md">
                <div class="column">
                    <div class="text-h6 q-mb-md">User Setting</div>
                    <q-btn flat rounded dense v-model="mobileData" label="Profile" size="sm"/>
                    <q-btn flat rounded dense v-model="bluetooth" label="Reset Password" size="sm"/>
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                    <q-avatar size="60px">
                        <img v-if="data?.user?.image == (null || undefined) " src=/images/users/nobody.png>
                        <img v-else :src=data?.user?.image!>
                    </q-avatar>

                    <div class="text-subtitle2 q-mt-md q-mb-xs">Alva Alvato</div>
                        <q-btn
                        color="primary"
                        label="Logout"
                        rounded
                        size="sm"
                        v-close-popup
                        @click="signOut({ callbackUrl: '/' })"
                        />
                    </div>
                </div>
            </q-menu>
        </q-avatar>
</template>

<script setup lang="ts">
    import {alvatoStore} from '@/stores/alvatoStore'
    const {data} = useAuth()
    const {signOut} = useAuth()

    const mobileData = ref(false)
    const bluetooth = ref(true)
</script>