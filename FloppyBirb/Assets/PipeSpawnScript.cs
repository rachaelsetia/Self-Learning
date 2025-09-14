using UnityEngine;

public class PipeSpawnScript : MonoBehaviour
{
    public GameObject pipe; // reference to the prefabricated GameObject we made (by dragging the Pipe parent object from the hierarchy to the assets folder in the project window)
    public float spawnRate = 5;
    private float timer = 0;
    public float heightOffset = 0;

    // Start is called once before the first execution of Update after the MonoBehaviour is created
    void Start(){
        spawnPipe();
    }

    // Update is called once per frame
    void Update(){
        if (timer < spawnRate) {
            timer += Time.deltaTime;
        } else {
            spawnPipe();
            timer = 0;
        }
    }

    void spawnPipe(){
        float lowestHeight = transform.position.y - heightOffset;
        float highestHeight = transform.position.y + heightOffset;
        Instantiate(pipe, new Vector3(transform.position.x, Random.Range(lowestHeight, highestHeight), 0), transform.rotation); // transform.position and .rotation give the pos and rot of the Pipe Spawner object
    }
}
