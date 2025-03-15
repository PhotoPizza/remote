package com.photopizza.remote

import org.json.JSONObject

/**
 * Data class representing the configuration of the PhotoPizza device
 */
data class PhotoPizzaConfig(
    var frame: Int = 100,
    var framesLeft: Int = 100,
    var speed: Int = 5000,
    var pause: Int = 100,
    var delay: Int = 300,
    var allSteps: Int = 200,
    var shootingMode: Int = 0,
    var direction: Int = 1,
    var state: String = "waiting",
    var currentStep: Int = 0
) {
    /**
     * Convert the configuration to a JSON object
     * @return JSONObject representation of the configuration
     */
    fun toJson(): JSONObject {
        val json = JSONObject()
        json.put("frame", frame)
        json.put("speed", speed)
        json.put("pause", pause)
        json.put("delay", delay)
        json.put("allSteps", allSteps)
        json.put("shootingMode", shootingMode)
        json.put("direction", direction)
        json.put("state", state)
        return json
    }

    fun updateFromJson(json: JSONObject) {
        if (json.has("frame")) frame = json.getInt("frame")
        if (json.has("framesLeft")) framesLeft = json.getInt("framesLeft")
        if (json.has("speed")) speed = json.getInt("speed")
        if (json.has("pause")) pause = json.getInt("pause")
        if (json.has("delay")) delay = json.getInt("delay")
        if (json.has("allSteps")) allSteps = json.getInt("allSteps")
        if (json.has("shootingMode")) shootingMode = json.getInt("shootingMode")
        if (json.has("direction")) direction = json.getInt("direction")
        if (json.has("state")) state = json.getString("state")
        if (json.has("currentStep")) currentStep = json.getInt("currentStep")
    }

    fun updateStatusFromJson(json: JSONObject) {
        if (json.has("framesLeft")) framesLeft = json.getInt("framesLeft")
        if (json.has("currentStep")) currentStep = json.getInt("currentStep")
        if (json.has("state")) state = json.getString("state")
    }

    companion object {
        /**
         * Create a PhotoPizzaConfig from a JSON object
         * @param json JSONObject containing the configuration
         * @return PhotoPizzaConfig instance
         */
        fun fromJson(json: JSONObject): PhotoPizzaConfig {
            return PhotoPizzaConfig(
                frame = json.optInt("frame", 100),
                framesLeft = json.optInt("framesLeft", 100),
                speed = json.optInt("speed", 5000),
                pause = json.optInt("pause", 100),
                delay = json.optInt("delay", 300),
                allSteps = json.optInt("allSteps", 200),
                shootingMode = json.optInt("shootingMode", 0),
                direction = json.optInt("direction", 1),
                state = json.optString("state", "waiting"),
                currentStep = json.optInt("currentStep", 0)
            )
        }
    }
} 