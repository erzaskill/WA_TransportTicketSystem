<template>
    <div class="homepage">
        <div class="intro">
            <h1>Explore the Universe with Our Planet App</h1>
            <p>
                Welcome to our planet application, where you can discover everything you need
                to know about the planets in our solar system. From their inhabitants
                to their unique features and characteristics, our guide has
                everything you need to explore the wonders of the universe.
            </p>
            <router-link to="/login" class="btn" @mousemove="addConfetti()">Login</router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import JSConfetti from 'js-confetti'
import { ref } from "vue"

const confettiRunning = ref(false)

const jsConfetti = new JSConfetti()

const addConfetti = () => {
    if (confettiRunning.value) {
        return
    }

    confettiRunning.value = true

    jsConfetti.addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
    }).then(() => {
        confettiRunning.value = false
    })
}
</script>

<style scoped>
.homepage {
    padding: 20px;
}

.intro {
    text-align: center;
    margin-bottom: 50px;
}

.intro h1 {
    font-size: 48px;
    margin-bottom: 20px;
}

.intro p {
    font-size: 24px;
    margin-bottom: 20px;
}

.btn {
    display: inline-block;
    padding: 15px 25px;
    font-size: 30px;
    font-weight: bold;
    text-decoration: none;
    border-radius: 5px;
    border: none;
    color: #fff;
    background-color: #007bff;
}

.btn:hover {
    background-color: #0069d9;
}
</style>