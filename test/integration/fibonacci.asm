start:
    MOV R0, #10     ; The number of Fibonacci numbers to calculate
    MOV R1, #0      ; R1 will hold the current Fibonacci number, F(0)
    MOV R2, #1      ; R2 will hold the next Fibonacci number, F(1)
    MOV R3, #0      ; R3 will be our counter starting from 0

loop:
    CMP R3, R0      ; Compare the counter with N
    BGE end         ; If counter >= N, exit the loop

    STR R1, [R4]    ; Store the F(0) at the address in R4
    ADD R4, R4, #4  ; Increment the address by 4 bytes

    ADD R5, R1, R2  ; Calculate next Fibonacci number F(i) + F(i+1)
    MOV R1, R2      ; Move F(i+1) to F(i)
    MOV R2, R5      ; New F(i+1) is the sum from R5

    ADD R3, R3, #1  ; Increment the counter
    B   loop        ; Continue the loop

end:
    ; The first 10 Fibonacci numbers are now stored in memory starting at the base address in R4